import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

export async function lapostaApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		body,
		qs,
		url: `https://api.laposta.nl/v2${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length === 0) {
		delete options.body;
	}

	if (Object.keys(qs).length === 0) {
		delete options.qs;
	}

	try {
		return await this.helpers.httpRequestWithAuthentication.call(this, 'lapostaApi', options);
	} catch (error) {
		throw new NodeApiError(this.getNode(), error);
	}
}

/**
 * Helper to get server IP or use a default
 */
export function getIpAddress(): string {
	// Laposta requires an IP address for member creation
	// For API calls from n8n, we use a default IP
	return '198.51.100.0';
}

/**
 * Process custom fields for member operations
 */
export function processCustomFields(customFields: IDataObject[]): IDataObject {
	const processed: IDataObject = {};

	for (const field of customFields) {
		if (field.name && field.value !== undefined) {
			processed[field.name as string] = field.value;
		}
	}

	return processed;
}
