import type { INodeProperties } from 'n8n-workflow';

export const segmentOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['segment'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new segment',
				action: 'Create a segment',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a segment',
				action: 'Delete a segment',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a segment',
				action: 'Get a segment',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many segments',
				action: 'Get many segments',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a segment',
				action: 'Update a segment',
			},
		],
		default: 'getAll',
	},
];

export const segmentFields: INodeProperties[] = [
	// List ID (required for all operations)
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
			},
		},
		default: '',
		description: 'The ID of the list to which the segment belongs',
	},

	// CREATE operation
	{
		displayName: 'Segment Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name for this segment',
	},
	{
		displayName: 'Definition',
		name: 'definition',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['create'],
			},
		},
		default: '',
		placeholder: '{"postcode"} = \'1234AB\'',
		description:
			'The definition of the segment (JSON format). It is recommended to first create a segment in Laposta and then retrieve it via the API to see the definition format.',
	},

	// GET, UPDATE, DELETE operations - Segment ID
	{
		displayName: 'Segment ID',
		name: 'segmentId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the segment',
	},

	// UPDATE operation
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['segment'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name for this segment',
			},
			{
				displayName: 'Definition',
				name: 'definition',
				type: 'string',
				default: '',
				placeholder: '{"postcode"} = \'1234AB\'',
				description: 'The definition of the segment (JSON format)',
			},
		],
	},
];
