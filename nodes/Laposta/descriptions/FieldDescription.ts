import type { INodeProperties } from 'n8n-workflow';

export const fieldOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['field'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new field',
				action: 'Create a field',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a field',
				action: 'Delete a field',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a field',
				action: 'Get a field',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many fields',
				action: 'Get many fields',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a field',
				action: 'Update a field',
			},
		],
		default: 'getAll',
	},
];

export const fieldFields: INodeProperties[] = [
	// List ID (required for all operations)
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['field'],
			},
		},
		default: '',
		description: 'The ID of the list to which the field belongs',
	},

	// CREATE operation
	{
		displayName: 'Field Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name for this field (for display)',
	},
	{
		displayName: 'Data Type',
		name: 'datatype',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['create'],
			},
		},
		options: [
			{
				name: 'Date',
				value: 'date',
			},
			{
				name: 'Numeric',
				value: 'numeric',
			},
			{
				name: 'Select Multiple',
				value: 'select_multiple',
			},
			{
				name: 'Select Single',
				value: 'select_single',
			},
			{
				name: 'Text',
				value: 'text',
			},
		],
		default: 'text',
		description: 'The data type of this field',
	},
	{
		displayName: 'Required',
		name: 'required',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['create'],
			},
		},
		default: false,
		description: 'Whether this field is required',
	},
	{
		displayName: 'In Form',
		name: 'in_form',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['create'],
			},
		},
		default: true,
		description: 'Whether the field is visible in the signup form',
	},
	{
		displayName: 'In List',
		name: 'in_list',
		type: 'boolean',
		required: true,
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['create'],
			},
		},
		default: true,
		description: 'Whether the field is visible in the list overview in Laposta',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Default Value',
				name: 'defaultvalue',
				type: 'string',
				default: '',
				description: 'Default value for this field',
			},
			{
				displayName: 'Data Type Display',
				name: 'datatype_display',
				type: 'options',
				displayOptions: {
					show: {
						'/datatype': ['select_single'],
					},
				},
				options: [
					{
						name: 'Select',
						value: 'select',
					},
					{
						name: 'Radio',
						value: 'radio',
					},
				],
				default: 'select',
				description: 'How to display the select field (only for select_single)',
			},
		],
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['create'],
				datatype: ['select_single', 'select_multiple'],
			},
		},
		default: [],
		placeholder: 'Add Option',
		description: 'Selection options (required for select_single and select_multiple)',
	},

	// GET, UPDATE, DELETE operations - Field ID
	{
		displayName: 'Field ID',
		name: 'fieldId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['field'],
				operation: ['get', 'update', 'delete'],
			},
		},
		default: '',
		description: 'The ID of the field',
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
				resource: ['field'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Data Type',
				name: 'datatype',
				type: 'options',
				options: [
					{
						name: 'Date',
						value: 'date',
					},
					{
						name: 'Numeric',
						value: 'numeric',
					},
					{
						name: 'Select Multiple',
						value: 'select_multiple',
					},
					{
						name: 'Select Single',
						value: 'select_single',
					},
					{
						name: 'Text',
						value: 'text',
					},
				],
				default: 'text',
				description:
					'The data type of this field. WARNING: Changing datatype will delete all existing data for this field.',
			},
			{
				displayName: 'Data Type Display',
				name: 'datatype_display',
				type: 'options',
				options: [
					{
						name: 'Radio',
						value: 'radio',
					},
					{
						name: 'Select',
						value: 'select',
					},
				],
				default: 'select',
				description: 'How to display the select field (only for select_single)',
			},
			{
				displayName: 'Default Value',
				name: 'defaultvalue',
				type: 'string',
				default: '',
				description: 'Default value for this field',
			},
			{
				displayName: 'In Form',
				name: 'in_form',
				type: 'boolean',
				default: true,
				description: 'Whether the field is visible in the signup form',
			},
			{
				displayName: 'In List',
				name: 'in_list',
				type: 'boolean',
				default: true,
				description: 'Whether the field is visible in the list overview in Laposta',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name for this field',
			},
			{
				displayName: 'Required',
				name: 'required',
				type: 'boolean',
				default: false,
				description: 'Whether this field is required',
			},
		],
	},
];
