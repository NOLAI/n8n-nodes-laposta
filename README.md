# n8n-nodes-laposta

This is an n8n community node. It lets you use Laposta email marketing and newsletter management in your n8n workflows.

[Laposta](https://www.laposta.nl/) is a Dutch email marketing platform that helps you manage newsletter subscribers, campaigns, and email automation.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Use Cases](#use-cases)
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

Install from the n8n Community Nodes menu using the package name: `n8n-nodes-laposta`

## Operations

This node provides comprehensive access to the Laposta API:

### Members
- **Create/Upsert** - Add or update a subscriber in a list
- **Update** - Update subscriber information
- **Get** - Retrieve a specific subscriber
- **Get Many** - List all subscribers in a list
- **Delete** - Remove a subscriber

### Lists
- **Create** - Create a new mailing list
- **Get** - Get details of a specific list
- **Get Many** - Retrieve all your mailing lists
- **Update** - Update list properties
- **Delete** - Delete a mailing list
- **Empty** - Remove all active members from a list

### Fields
- **Create** - Add a custom field to a list
- **Get** - Get details of a specific field
- **Get Many** - Retrieve all fields of a list
- **Update** - Update field properties
- **Delete** - Remove a field

### Segments
- **Create** - Create a segment for targeted campaigns
- **Get** - Get details of a specific segment
- **Get Many** - Retrieve all segments of a list
- **Update** - Update segment properties
- **Delete** - Remove a segment

### Campaigns
- **Create** - Create a new email campaign
- **Get** - Get campaign details
- **Get Many** - List all campaigns
- **Update** - Update campaign properties
- **Delete** - Delete a campaign
- **Get Content** - Retrieve campaign HTML/text content
- **Set Content** - Update campaign content
- **Send** - Send campaign immediately
- **Schedule** - Schedule campaign for later delivery
- **Send Test** - Send a test email

## Credentials

You'll need a Laposta API key to use this node.

### Getting your API Key

1. Log in to your [Laposta account](https://app.laposta.nl/)
2. Navigate to **Toegang & Abonnement** (Access & Subscription)
3. Select **Koppelingen - API** (Integrations - API)
4. Copy your API key
5. In n8n, create a new **Laposta API** credential
6. Paste your API key

The API key uses HTTP Basic Authentication with the key as the username and an empty password.

## Compatibility

Compatible with n8n@1.60.0 or later

## Use Cases

### CRM to Newsletter Sync
Automatically add new customers from your CRM to your Laposta newsletter list when they opt in.

### E-commerce Integration
Sync WooCommerce or Shopify customers to specific segments based on purchase history or product interests.

### Event Registration
Add event registrants to a mailing list with custom fields for event details and preferences.

### Automated Campaigns
Create workflows that automatically send targeted campaigns based on user behavior or data changes.

### Multi-system Sync
Keep subscriber data synchronized between Laposta and other platforms like Salesforce, HubSpot, or custom databases.

### Lead Scoring
Update custom fields in Laposta based on user engagement tracked in other systems.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
* [Laposta API documentation](https://api.laposta.nl/)
* [Laposta website](https://www.laposta.nl/)

## License

[MIT](LICENSE)

## Author

Julian van der Horst - [julianvanderhorst@pm.me](mailto:julianvanderhorst@pm.me)
