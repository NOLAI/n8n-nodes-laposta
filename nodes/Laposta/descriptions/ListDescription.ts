import type { INodeProperties } from 'n8n-workflow';

export const listOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['list'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new list',
				action: 'Create a list',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a list',
				action: 'Delete a list',
			},
			{
				name: 'Empty',
				value: 'empty',
				description: 'Remove all active members from a list',
				action: 'Empty a list',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a list',
				action: 'Get a list',
			},
			{
				name: 'Get Many',
				value: 'getAll',
				description: 'Get many lists',
				action: 'Get many lists',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a list',
				action: 'Update a list',
			},
		],
		default: 'getAll',
	},
];

export const listFields: INodeProperties[] = [
	// CREATE operation
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['create'],
			},
		},
		default: '',
		description: 'Name for this list',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description:
					'Whether the list is locked (cannot be modified by users in the application)',
			},
			{
				displayName: 'Remarks',
				name: 'remarks',
				type: 'string',
				default: '',
				description: 'Any remarks or notes about this list',
			},
			{
				displayName: 'Subscribe Notification Email',
				name: 'subscribe_notification_email',
				type: 'string',
				placeholder: 'notifications@example.com',
				default: '',
				description: 'Email address to receive notifications for new subscriptions',
			},
			{
				displayName: 'Unsubscribe Notification Email',
				name: 'unsubscribe_notification_email',
				type: 'string',
				placeholder: 'notifications@example.com',
				default: '',
				description: 'Email address to receive notifications for unsubscriptions',
			},
		],
	},

	// GET, UPDATE, DELETE, EMPTY operations - List ID
	{
		displayName: 'List ID',
		name: 'listId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['list'],
				operation: ['get', 'update', 'delete', 'empty'],
			},
		},
		default: '',
		description: 'The ID of the Laposta list',
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
				resource: ['list'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Locked',
				name: 'locked',
				type: 'boolean',
				default: false,
				description:
					'Whether the list is locked (cannot be modified by users in the application)',
			},
			{
				displayName: 'Name',
				name: 'name',
				type: 'string',
				default: '',
				description: 'Name for this list',
			},
			{
				displayName: 'Remarks',
				name: 'remarks',
				type: 'string',
				default: '',
				description: 'Any remarks or notes about this list',
			},
			{
				displayName: 'Subscribe Notification Email',
				name: 'subscribe_notification_email',
				type: 'string',
				placeholder: 'notifications@example.com',
				default: '',
				description: 'Email address to receive notifications for new subscriptions',
			},
			{
				displayName: 'Unsubscribe Notification Email',
				name: 'unsubscribe_notification_email',
				type: 'string',
				placeholder: 'notifications@example.com',
				default: '',
				description: 'Email address to receive notifications for unsubscriptions',
			},
		],
	},
];
