import type { INodeProperties } from 'n8n-workflow';

export const memberOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['member'],
			},
		},
		options: [
			{
				name: 'Create or Update',
				value: 'upsert',
				description: 'Create a new record, or update the current one if it already exists (upsert)',
				action: 'Create or update a member',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a member',
				action: 'Delete a member',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a member',
				action: 'Get a member',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many members',
				action: 'Get many members',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a member',
				action: 'Update a member',
			},
		],
		default: 'upsert',
	},
];

export const memberFields: INodeProperties[] = [
	// List ID (required for all operations)
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['member'],
			},
		},
		default: '',
		description: 'The ID of the Laposta list',
	},

	// CREATE/UPSERT fields
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['upsert'],
			},
		},
		default: '',
		description: 'Email address of the member',
	},
	{
		displayName: 'Options',
		name: 'options',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['upsert'],
			},
		},
		options: [
			{
				displayName: 'Ignore Double Opt-In',
				name: 'ignore_doubleoptin',
				type: 'boolean',
				default: false,
				description: 'Whether to make relations immediately active and skip confirmation email',
			},
			{
				displayName: 'Source URL',
				name: 'source_url',
				type: 'string',
				default: '',
				description: 'The URL from where the relation was registered',
			},
			{
				displayName: 'Suppress Email Notification',
				name: 'suppress_email_notification',
				type: 'boolean',
				default: true,
				description: 'Whether to prevent notification emails from being sent',
			},
			{
				displayName: 'Suppress Reactivation',
				name: 'suppress_reactivation',
				type: 'boolean',
				default: false,
				description: 'Whether to prevent unsubscribed relations from being reactivated',
			},
			{
				displayName: 'Upsert',
				name: 'upsert',
				type: 'boolean',
				default: true,
				description: 'Whether to overwrite fields if the email already exists in an active relation',
			},
		],
	},
	{
		displayName: 'Custom Fields',
		name: 'customFieldsUi',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Custom Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['upsert', 'update'],
			},
		},
		options: [
			{
				name: 'customFieldsValues',
				displayName: 'Custom Field',
				values: [
					{
						displayName: 'Field Name or ID',
						name: 'name',
						type: 'string',
						default: '',
						description: 'The custom_name of the field (e.g., "name", "company")',
					},
					{
						displayName: 'Field Value',
						name: 'value',
						type: 'string',
						default: '',
						description: 'The value for this custom field',
					},
				],
			},
		],
		description: 'Additional fields for the member',
	},

	// GET operation
	{
		displayName: 'Member ID or Email',
		name: 'memberId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['get', 'delete'],
			},
		},
		default: '',
		description: 'The ID or email address of the member',
	},

	// UPDATE operation
	{
		displayName: 'Member ID or Email',
		name: 'memberId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'The ID or email address of the member to update',
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Email',
				name: 'email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'New email address',
			},
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Unsubscribed',
						value: 'unsubscribed',
					},
				],
				default: 'active',
				description: 'The status of the member',
			},
		],
	},

	// GET ALL operation
	{
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['getAll'],
			},
		},
		default: false,
		description: 'Whether to return all results or only up to a given limit',
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['getAll'],
				returnAll: [false],
			},
		},
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['member'],
				operation: ['getAll'],
			},
		},
		options: [
			{
				displayName: 'State',
				name: 'state',
				type: 'options',
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Unsubscribed',
						value: 'unsubscribed',
					},
					{
						name: 'Cleaned',
						value: 'cleaned',
					},
				],
				default: 'active',
				description: 'Filter by member state',
			},
		],
	},
];
