import type { INodeProperties } from 'n8n-workflow';

export const campaignOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new campaign',
				action: 'Create a campaign',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a campaign',
				action: 'Delete a campaign',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a campaign',
				action: 'Get a campaign',
			},
			{
				name: 'Get Content',
				value: 'getContent',
				description: 'Get campaign content (HTML and plaintext)',
				action: 'Get campaign content',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many campaigns',
				action: 'Get many campaigns',
			},
			{
				name: 'Schedule',
				value: 'schedule',
				description: 'Schedule a campaign for later delivery',
				action: 'Schedule a campaign',
			},
			{
				name: 'Send',
				value: 'send',
				description: 'Send a campaign immediately',
				action: 'Send a campaign',
			},
			{
				name: 'Send Test',
				value: 'sendTest',
				description: 'Send a test email',
				action: 'Send a test email',
			},
			{
				name: 'Set Content',
				value: 'setContent',
				description: 'Set campaign content (HTML or import URL)',
				action: 'Set campaign content',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a campaign',
				action: 'Update a campaign',
			},
		],
		default: 'create',
	},
];

export const campaignFields: INodeProperties[] = [
	// CREATE operation
	{
		displayName: 'Campaign Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Internal name for this campaign',
	},
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Subject line of the email',
	},
	{
		displayName: 'From Name',
		name: 'fromName',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Sender name',
	},
	{
		displayName: 'From Email',
		name: 'fromEmail',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Sender email address (must be approved in Laposta)',
	},
	{
		displayName: 'List IDs',
		name: 'list_ids',
		type: 'string',
		typeOptions: {
			multipleValues: true,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		default: [],
		placeholder: 'Add List ID',
		description: 'IDs of the lists to send this campaign to',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Reply To',
				name: 'reply_to',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Reply-to email address',
			},
			{
				displayName: 'Google Analytics',
				name: 'ga',
				type: 'boolean',
				default: false,
				description: 'Whether to enable Google Analytics tracking',
			},
			{
				displayName: 'Mtrack',
				name: 'mtrack',
				type: 'boolean',
				default: false,
				description: 'Whether to enable Mtrack',
			},
		],
	},

	// GET, UPDATE, DELETE, SEND, SCHEDULE, SENDTEST, SETCONTENT, GETCONTENT operations - Campaign ID
	{
		displayName: 'Campaign ID',
		name: 'campaignId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: [
					'get',
					'update',
					'delete',
					'send',
					'schedule',
					'sendTest',
					'setContent',
					'getContent',
				],
			},
		},
		default: '',
		description: 'The ID of the campaign',
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
				resource: ['campaign'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'From Email',
				name: 'from_email',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Sender email address (must be approved in Laposta)',
			},
			{
				displayName: 'From Name',
				name: 'from_name',
				type: 'string',
				default: '',
				description: 'Sender name',
			},
			{
				displayName: 'Google Analytics',
				name: 'ga',
				type: 'boolean',
				default: false,
				description: 'Whether to enable Google Analytics tracking',
			},
			{
				displayName: 'Mtrack',
				name: 'mtrack',
				type: 'boolean',
				default: false,
				description: 'Whether to enable Mtrack',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Internal name for this campaign',
			},
			{
				displayName: 'Reply To',
				name: 'reply_to',
				type: 'string',
				placeholder: 'name@email.com',
				default: '',
				description: 'Reply-to email address',
			},
			{
				displayName: 'Subject',
				name: 'subject',
				type: 'string',
				default: '',
				description: 'Subject line of the email',
			},
		],
	},

	// SETCONTENT operation
	{
		displayName: 'Content Source',
		name: 'contentSource',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['setContent'],
			},
		},
		options: [
			{
				name: 'HTML',
				value: 'html',
				description: 'Provide HTML content directly',
			},
			{
				name: 'Import URL',
				value: 'url',
				description: 'Import content from a URL',
			},
		],
		default: 'html',
		description: 'How to provide the campaign content',
	},
	{
		displayName: 'HTML',
		name: 'html',
		type: 'string',
		typeOptions: {
			rows: 10,
		},
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['setContent'],
				contentSource: ['html'],
			},
		},
		default: '',
		description: 'The HTML content for the campaign',
	},
	{
		displayName: 'Import URL',
		name: 'import_url',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['setContent'],
				contentSource: ['url'],
			},
		},
		default: '',
		placeholder: 'https://example.com/newsletter.html',
		description: 'URL to import HTML content from',
	},
	{
		displayName: 'Additional Options',
		name: 'contentOptions',
		type: 'collection',
		placeholder: 'Add Option',
		default: {},
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['setContent'],
			},
		},
		options: [
			{
				displayName: 'Inline CSS',
				name: 'inline_css',
				type: 'boolean',
				default: false,
				description: 'Whether to inline CSS styles',
			},
		],
	},

	// SCHEDULE operation
	{
		displayName: 'Delivery Date/Time',
		name: 'delivery_requested',
		type: 'dateTime',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['schedule'],
			},
		},
		default: '',
		description: 'When to send the campaign (format: YYYY-MM-DD HH:MM:SS)',
	},

	// SENDTEST operation
	{
		displayName: 'Test Email',
		name: 'testEmail',
		type: 'string',
		placeholder: 'name@email.com',
		required: true,
		displayOptions: {
			show: {
				resource: ['campaign'],
				operation: ['sendTest'],
			},
		},
		default: '',
		description: 'Email address to send the test to',
	},
];
