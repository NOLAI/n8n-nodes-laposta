import type {
	IExecuteFunctions,
	IHookFunctions,
	ILoadOptionsFunctions,
	IDataObject,
	IHttpRequestMethods,
	IHttpRequestOptions,
} from 'n8n-workflow';
import { NodeApiError } from 'n8n-workflow';

/**
 * Convert nested objects to bracket notation for form encoding
 * e.g., { custom_fields: { name: 'value' } } → { 'custom_fields[name]': 'value' }
 */
export function toBracketNotation(obj: IDataObject, prefix = ''): IDataObject {
	const result: IDataObject = {};

	for (const [key, value] of Object.entries(obj)) {
		const newKey = prefix ? `${prefix}[${key}]` : key;

		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			Object.assign(result, toBracketNotation(value as IDataObject, newKey));
		} else {
			result[newKey] = value;
		}
	}

	return result;
}

export async function lapostaApiRequest(
	this: IHookFunctions | IExecuteFunctions | ILoadOptionsFunctions,
	method: IHttpRequestMethods,
	endpoint: string,
	body: IDataObject = {},
	qs: IDataObject = {},
): Promise<IDataObject> {
	const options: IHttpRequestOptions = {
		method,
		qs,
		url: `https://api.laposta.nl/v2${endpoint}`,
		json: true,
	};

	if (Object.keys(body).length > 0) {
		// Convert to bracket notation and use form encoding
		options.body = toBracketNotation(body);
		options.headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
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
