import type {
	IDataObject,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';

import { lapostaApiRequest, getIpAddress, processCustomFields } from './GenericFunctions';

import { memberOperations, memberFields } from './descriptions/MemberDescription';

import { listOperations, listFields } from './descriptions/ListDescription';

import { fieldOperations, fieldFields } from './descriptions/FieldDescription';

import { segmentOperations, segmentFields } from './descriptions/SegmentDescription';

import { campaignOperations, campaignFields } from './descriptions/CampaignDescription';

export class Laposta implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Laposta',
		name: 'laposta',
		icon: 'file:../../icons/laposta.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Laposta API',
		defaults: {
			name: 'Laposta',
		},
		usableAsTool: true,
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'lapostaApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Campaign',
						value: 'campaign',
					},
					{
						name: 'Field',
						value: 'field',
					},
					{
						name: 'List',
						value: 'list',
					},
					{
						name: 'Member',
						value: 'member',
					},
					{
						name: 'Segment',
						value: 'segment',
					},
				],
				default: 'member',
			},
			...campaignOperations,
			...campaignFields,
			...fieldOperations,
			...fieldFields,
			...listOperations,
			...listFields,
			...memberOperations,
			...memberFields,
			...segmentOperations,
			...segmentFields,
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const resource = this.getNodeParameter('resource', 0);
		const operation = this.getNodeParameter('operation', 0);

		for (let i = 0; i < items.length; i++) {
			try {
				if (resource === 'campaign') {
					// CAMPAIGN OPERATIONS
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const subject = this.getNodeParameter('subject', i) as string;
						const fromName = this.getNodeParameter('fromName', i) as string;
						const fromEmail = this.getNodeParameter('fromEmail', i) as string;
						const list_ids = this.getNodeParameter('list_ids', i) as string[];
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							type: 'regular',
							name,
							subject,
							from: {
								name: fromName,
								email: fromEmail,
							},
							list_ids: list_ids.reduce((acc: IDataObject, listId: string) => {
								acc[listId] = [];
								return acc;
							}, {}),
						};

						if (additionalFields.reply_to) body.reply_to = additionalFields.reply_to;

						const stats: IDataObject = {};
						if (additionalFields.ga !== undefined) stats.ga = additionalFields.ga;
						if (additionalFields.mtrack !== undefined) stats.mtrack = additionalFields.mtrack;
						if (Object.keys(stats).length > 0) body.stats = stats;

						const response = await lapostaApiRequest.call(this, 'POST', '/campaign', body);
						returnData.push({ json: response });
					} else if (operation === 'get') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'GET',
							`/campaign/${campaignId}`,
						);
						returnData.push({ json: response });
					} else if (operation === 'getAll') {
						const response = await lapostaApiRequest.call(this, 'GET', '/campaign');
						const responseData = response.data as IDataObject[];
						returnData.push(...responseData.map((item) => ({ json: item })));
					} else if (operation === 'update') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.name) body.name = updateFields.name;
						if (updateFields.subject) body.subject = updateFields.subject;

						if (updateFields.from_name || updateFields.from_email) {
							const from: IDataObject = {};
							if (updateFields.from_name) from.name = updateFields.from_name;
							if (updateFields.from_email) from.email = updateFields.from_email;
							body.from = from;
						}

						if (updateFields.reply_to) body.reply_to = updateFields.reply_to;

						const stats: IDataObject = {};
						if (updateFields.ga !== undefined) stats.ga = updateFields.ga;
						if (updateFields.mtrack !== undefined) stats.mtrack = updateFields.mtrack;
						if (Object.keys(stats).length > 0) body.stats = stats;

						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/campaign/${campaignId}`,
							body,
						);
						returnData.push({ json: response });
					} else if (operation === 'delete') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'DELETE',
							`/campaign/${campaignId}`,
						);
						returnData.push({ json: response });
					} else if (operation === 'getContent') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'GET',
							`/campaign/${campaignId}/content`,
						);
						returnData.push({ json: response });
					} else if (operation === 'setContent') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const contentSource = this.getNodeParameter('contentSource', i) as string;
						const contentOptions = this.getNodeParameter('contentOptions', i, {}) as IDataObject;

						const body: IDataObject = {};

						if (contentSource === 'html') {
							body.html = this.getNodeParameter('html', i) as string;
						} else {
							body.import_url = this.getNodeParameter('import_url', i) as string;
						}

						if (contentOptions.inline_css !== undefined)
							body.inline_css = contentOptions.inline_css;

						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/campaign/${campaignId}/content`,
							body,
						);
						returnData.push({ json: response });
					} else if (operation === 'send') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/campaign/${campaignId}/action/send`,
						);
						returnData.push({ json: response });
					} else if (operation === 'schedule') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const delivery_requested = this.getNodeParameter('delivery_requested', i) as string;

						const body: IDataObject = {
							delivery_requested,
						};

						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/campaign/${campaignId}/action/schedule`,
							body,
						);
						returnData.push({ json: response });
					} else if (operation === 'sendTest') {
						const campaignId = this.getNodeParameter('campaignId', i) as string;
						const testEmail = this.getNodeParameter('testEmail', i) as string;

						const body: IDataObject = {
							email: testEmail,
						};

						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/campaign/${campaignId}/action/testmail`,
							body,
						);
						returnData.push({ json: response });
					}
				} else if (resource === 'field') {
					// FIELD OPERATIONS
					const listId = this.getNodeParameter('listId', i) as string;

					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const datatype = this.getNodeParameter('datatype', i) as string;
						const required = this.getNodeParameter('required', i) as boolean;
						const in_form = this.getNodeParameter('in_form', i) as boolean;
						const in_list = this.getNodeParameter('in_list', i) as boolean;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							list_id: listId,
							name,
							datatype,
							required,
							in_form,
							in_list,
						};

						if (additionalFields.defaultvalue) body.defaultvalue = additionalFields.defaultvalue;
						if (additionalFields.datatype_display)
							body.datatype_display = additionalFields.datatype_display;

						// Handle options for select fields
						if (datatype === 'select_single' || datatype === 'select_multiple') {
							const options = this.getNodeParameter('options', i, []) as string[];
							if (options.length > 0) {
								body.options = options;
							}
						}

						const response = await lapostaApiRequest.call(this, 'POST', '/field', body);
						returnData.push({ json: response });
					} else if (operation === 'get') {
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'GET',
							`/field/${fieldId}`,
							{},
							{ list_id: listId },
						);
						returnData.push({ json: response });
					} else if (operation === 'getAll') {
						const response = await lapostaApiRequest.call(
							this,
							'GET',
							'/field',
							{},
							{ list_id: listId },
						);
						const responseData = response.data as IDataObject[];
						returnData.push(...responseData.map((item) => ({ json: item })));
					} else if (operation === 'update') {
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							list_id: listId,
						};

						if (updateFields.name) body.name = updateFields.name;
						if (updateFields.datatype) body.datatype = updateFields.datatype;
						if (updateFields.datatype_display)
							body.datatype_display = updateFields.datatype_display;
						if (updateFields.defaultvalue !== undefined)
							body.defaultvalue = updateFields.defaultvalue;
						if (updateFields.required !== undefined) body.required = updateFields.required;
						if (updateFields.in_form !== undefined) body.in_form = updateFields.in_form;
						if (updateFields.in_list !== undefined) body.in_list = updateFields.in_list;

						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/field/${fieldId}`,
							body,
						);
						returnData.push({ json: response });
					} else if (operation === 'delete') {
						const fieldId = this.getNodeParameter('fieldId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'DELETE',
							`/field/${fieldId}`,
							{},
							{ list_id: listId },
						);
						returnData.push({ json: response });
					}
				} else if (resource === 'member') {
					// MEMBER OPERATIONS
					if (operation === 'upsert') {
						const listId = this.getNodeParameter('listId', i) as string;
						const email = this.getNodeParameter('email', i) as string;
						const options = this.getNodeParameter('options', i, {}) as IDataObject;
						const customFieldsUi = this.getNodeParameter('customFieldsUi', i, {}) as IDataObject;

						const body: IDataObject = {
							list_id: listId,
							ip: getIpAddress(),
							email,
						};

						// Add custom fields
						if (customFieldsUi?.customFieldsValues) {
							body.custom_fields = processCustomFields(
								customFieldsUi.customFieldsValues as IDataObject[],
							);
						}

						// Add options
						const optionsObj: IDataObject = {};
						if (options.upsert !== undefined) optionsObj.upsert = options.upsert;
						if (options.suppress_reactivation) optionsObj.suppress_reactivation = true;
						if (options.suppress_email_notification)
							optionsObj.suppress_email_notification = true;
						if (options.ignore_doubleoptin) optionsObj.ignore_doubleoptin = true;
						if (options.source_url) body.source_url = options.source_url;

						if (Object.keys(optionsObj).length > 0) {
							body.options = optionsObj;
						}

						const response = await lapostaApiRequest.call(this, 'POST', '/member', body);
						returnData.push({ json: response });
					} else if (operation === 'update') {
						const listId = this.getNodeParameter('listId', i) as string;
						const memberId = this.getNodeParameter('memberId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;
						const customFieldsUi = this.getNodeParameter('customFieldsUi', i, {}) as IDataObject;

						const body: IDataObject = {
							list_id: listId,
						};

						if (updateFields.email) body.email = updateFields.email;
						if (updateFields.state) body.state = updateFields.state;

						// Add custom fields
						if (customFieldsUi?.customFieldsValues) {
							body.custom_fields = processCustomFields(
								customFieldsUi.customFieldsValues as IDataObject[],
							);
						}

						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/member/${memberId}`,
							body,
						);
						returnData.push({ json: response });
					} else if (operation === 'get') {
						const listId = this.getNodeParameter('listId', i) as string;
						const memberId = this.getNodeParameter('memberId', i) as string;

						const response = await lapostaApiRequest.call(
							this,
							'GET',
							`/member/${memberId}`,
							{},
							{ list_id: listId },
						);
						returnData.push({ json: response });
					} else if (operation === 'delete') {
						const listId = this.getNodeParameter('listId', i) as string;
						const memberId = this.getNodeParameter('memberId', i) as string;

						const response = await lapostaApiRequest.call(
							this,
							'DELETE',
							`/member/${memberId}`,
							{},
							{ list_id: listId },
						);
						returnData.push({ json: response });
					} else if (operation === 'getAll') {
						const listId = this.getNodeParameter('listId', i) as string;
						const returnAll = this.getNodeParameter('returnAll', i);
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const qs: IDataObject = {
							list_id: listId,
						};

						if (additionalFields.state) {
							qs.state = additionalFields.state;
						}

						const response = await lapostaApiRequest.call(this, 'GET', '/member', {}, qs);

						if (returnAll) {
							const responseData = response.data as IDataObject[];
							returnData.push(...responseData.map((item) => ({ json: item })));
						} else {
							const limit = this.getNodeParameter('limit', i);
							const responseData = response.data as IDataObject[];
							const items = responseData.slice(0, limit);
							returnData.push(...items.map((item) => ({ json: item })));
						}
					}
				} else if (resource === 'list') {
					// LIST OPERATIONS
					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;

						const body: IDataObject = {
							name,
						};

						if (additionalFields.locked !== undefined) body.locked = additionalFields.locked;
						if (additionalFields.remarks) body.remarks = additionalFields.remarks;
						if (additionalFields.subscribe_notification_email)
							body.subscribe_notification_email = additionalFields.subscribe_notification_email;
						if (additionalFields.unsubscribe_notification_email)
							body.unsubscribe_notification_email =
								additionalFields.unsubscribe_notification_email;

						const response = await lapostaApiRequest.call(this, 'POST', '/list', body);
						returnData.push({ json: response });
					} else if (operation === 'get') {
						const listId = this.getNodeParameter('listId', i) as string;
						const response = await lapostaApiRequest.call(this, 'GET', `/list/${listId}`);
						returnData.push({ json: response });
					} else if (operation === 'getAll') {
						const response = await lapostaApiRequest.call(this, 'GET', '/list');
						const responseData = response.data as IDataObject[];
						returnData.push(...responseData.map((item) => ({ json: item })));
					} else if (operation === 'update') {
						const listId = this.getNodeParameter('listId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {};

						if (updateFields.name) body.name = updateFields.name;
						if (updateFields.locked !== undefined) body.locked = updateFields.locked;
						if (updateFields.remarks !== undefined) body.remarks = updateFields.remarks;
						if (updateFields.subscribe_notification_email)
							body.subscribe_notification_email = updateFields.subscribe_notification_email;
						if (updateFields.unsubscribe_notification_email)
							body.unsubscribe_notification_email =
								updateFields.unsubscribe_notification_email;

						const response = await lapostaApiRequest.call(this, 'POST', `/list/${listId}`, body);
						returnData.push({ json: response });
					} else if (operation === 'delete') {
						const listId = this.getNodeParameter('listId', i) as string;
						const response = await lapostaApiRequest.call(this, 'DELETE', `/list/${listId}`);
						returnData.push({ json: response });
					} else if (operation === 'empty') {
						const listId = this.getNodeParameter('listId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'DELETE',
							`/list/${listId}/members`,
						);
						returnData.push({ json: response });
					}
				} else if (resource === 'segment') {
					// SEGMENT OPERATIONS
					const listId = this.getNodeParameter('listId', i) as string;

					if (operation === 'create') {
						const name = this.getNodeParameter('name', i) as string;
						const definition = this.getNodeParameter('definition', i) as string;

						const body: IDataObject = {
							list_id: listId,
							name,
							definition,
						};

						const response = await lapostaApiRequest.call(this, 'POST', '/segment', body);
						returnData.push({ json: response });
					} else if (operation === 'get') {
						const segmentId = this.getNodeParameter('segmentId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'GET',
							`/segment/${segmentId}`,
							{},
							{ list_id: listId },
						);
						returnData.push({ json: response });
					} else if (operation === 'getAll') {
						const response = await lapostaApiRequest.call(
							this,
							'GET',
							'/segment',
							{},
							{ list_id: listId },
						);
						const responseData = response.data as IDataObject[];
						returnData.push(...responseData.map((item) => ({ json: item })));
					} else if (operation === 'update') {
						const segmentId = this.getNodeParameter('segmentId', i) as string;
						const updateFields = this.getNodeParameter('updateFields', i, {}) as IDataObject;

						const body: IDataObject = {
							list_id: listId,
						};

						if (updateFields.name) body.name = updateFields.name;
						if (updateFields.definition) body.definition = updateFields.definition;

						const response = await lapostaApiRequest.call(
							this,
							'POST',
							`/segment/${segmentId}`,
							body,
						);
						returnData.push({ json: response });
					} else if (operation === 'delete') {
						const segmentId = this.getNodeParameter('segmentId', i) as string;
						const response = await lapostaApiRequest.call(
							this,
							'DELETE',
							`/segment/${segmentId}`,
							{},
							{ list_id: listId },
						);
						returnData.push({ json: response });
					}
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: (error as Error).message,
						},
						pairedItem: i,
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}
