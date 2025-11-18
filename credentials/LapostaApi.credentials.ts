import type {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
	Icon,
} from 'n8n-workflow';

export class LapostaApi implements ICredentialType {
	name = 'lapostaApi';

	displayName = 'Laposta API';

	documentationUrl = 'https://api.laposta.nl/';

	icon = 'file:laposta.svg' as Icon;

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Laposta API key. Find it in Laposta under Toegang & Abonnement > Koppelingen - API.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.apiKey}}',
				password: '',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.laposta.nl',
			url: '/v2/list',
			method: 'GET',
		},
	};
}
