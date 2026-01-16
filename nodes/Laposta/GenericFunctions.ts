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
 * Flatten nested objects for form-urlencoded format
 * Converts { custom_fields: { name: "John" } } to { "custom_fields[name]": "John" }
 */
function flattenObjectForForm(obj: IDataObject, parentKey = ''): IDataObject {
	const result: IDataObject = {};

	for (const key of Object.keys(obj)) {
		const value = obj[key];
		const newKey = parentKey ? `${parentKey}[${key}]` : key;

		if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
			// Recursively flatten nested objects
			Object.assign(result, flattenObjectForForm(value as IDataObject, newKey));
		} else if (Array.isArray(value)) {
			// Handle arrays (e.g., for multi-select fields)
			for (const item of value) {
				if (typeof item === 'object') {
					Object.assign(result, flattenObjectForForm(item as IDataObject, `${newKey}[]`));
				} else {
					// For simple arrays, use [] notation
					if (!result[`${newKey}[]`]) {
						result[`${newKey}[]`] = [];
					}
					(result[`${newKey}[]`] as unknown[]).push(item);
				}
			}
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
	// Flatten nested objects for form-urlencoded format
	// Laposta API expects: custom_fields[name]=value, not JSON
	const flattenedBody = Object.keys(body).length > 0 ? flattenObjectForForm(body) : {};

	const options: IHttpRequestOptions = {
		method,
		body: flattenedBody,
		qs,
		url: `https://api.laposta.nl/v2${endpoint}`,
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
	};

	if (Object.keys(flattenedBody).length === 0) {
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
