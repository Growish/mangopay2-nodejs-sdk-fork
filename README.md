Mangopay Node.js SDK
=================================================
MangopaySDK is a Node.js client library to work with [Mangopay REST API](http://docs.mangopay.com/api-references/).


Installation
-------------------------------------------------
Install the module via npm

    npm install mangopay4-nodejs-sdk --save

Usage inside your app

    var mangopay = require('mangopay4-nodejs-sdk');

    var api = new mangopay({
        clientId: 'your_client_id',
        clientApiKey: 'your_client_api_key',
        // Set the right production API url. If testing, omit the property since it defaults to sandbox URL
        baseUrl: 'https://api.mangopay.com'
    });

    api.Users.create(...)

Supported options
-------------------------------------------------
| Option    | Default value | Description |
| --------  | -----------   | ----------- |
|clientId   |null      | API Client Id|
|clientApiKey|null| API Client Api Key|
|baseUrl|"https://api.sandbox.mangopay.com"| API Base URL. The default value points to sandbox. Production is 'https://api.mangopay.com'|
|debugMode|false| Active debugging|
|logClass|```function() {console.log(arguments)}```|Log function to be used for debug|
|connectionTimeout|30000|Set the connection timeout limit (in milliseconds)|
|responseTimeout|80000|Set the response timeout limit (in milliseconds)|
|apiVersion|'v2.01'|API Version|
|errorHandler|```function(options, err) {console.error(options, err)}```|Set a custom error handler|
|cert|null|Base64-encoded string of the mTLS certificate `.pem` file content|
|key|null|Base64-encoded string of the mTLS private `.key` file content|
|ca|null|Base64-encoded string of the private or custom certificate authority (optional)|
|passphrase|null|Passphrase for an encrypted mTLS private key (optional)|
|certFilePath|null|Path to the mTLS certificate `.pem` file (takes precedence over `cert` if set)|
|keyFilePath|null|Path to the mTLS private `.key` file (takes precedence over `key` if set)|
|caFilePath|null|Path to the private or custom certificate authority file (takes precedence over `ca` if set)|


mTLS
-------------------------------------------------
### Set the base URL for mTLS

Using mTLS authentication requires your integration to call a base URL with a different hostname from the standard API:

* Sandbox: `https://api-mtls.sandbox.mangopay.com`
* Production: `https://api-mtls.mangopay.com`

If using mTLS, your integration should use the `api-mtls` URLs for all API calls, including OAuth token generation.

**Caution:** Ensure you set the mTLS base URL, as shown in the configuration examples below. If you don’t, the mTLS certificate will not be transferred to Mangopay. When mTLS is enforced, your integration will result in an error.

### Configure the SDK’s mTLS properties

The Node.js SDK allows you to load Base64-encoded strings from your environment variables. You can also load locally stored file paths, which may be useful during testing.

**Caution:** The file path properties take precedence if both are set.

#### Base64-encoded strings

When your `.pem` certificate and private `.key` are stored as encoded strings in a secrets manager, you can load them using the following configuration properties.

**Best practice:** Use this option in Production.

  | Property     | Type              | Description                                                                   |
  | ------------ | ----------------- |-------------------------------------------------------------------------------|
  | `cert`       | string            | Base64-encoded string of the certificate `.pem` file content.                 |
  | `key`        | string            | Base64-encoded string of the private `.key` file content.                     |
  | `ca`         | string (optional) | Base64-encoded string of the private or custom certificate authority, if used. |
  | `passphrase` | string (optional) | String of the passphrase for an encrypted private key.                        |

  ```jsx  theme={null}
  const mangopay = new Mangopay({
    clientId: 'your-mangopay-client-id',
    clientApiKey: 'your-api-key',
    baseUrl: 'https://api-mtls.sandbox.mangopay.com', // mTLS base URL
    cert: process.env.CERTIFICATE_PEM_B64,      // Base64-encoded
    key: process.env.PRIVATE_KEY_B64,        // Base64-encoded 
    ca: process.env.YOUR_CUSTOM_CA,          // Base64-encoded (optional)
    passphrase: process.env.YOUR_CERT_PASSPHRASE, // (optional)
  });
  ```

#### File paths

If your `.pem` certificate and private `.key` are stored locally, for example during testing, you can load them using the following properties.

**Caution:** If the file path properties are set, they take precedence and the Base64-encoded equivalents are ignored.

  | Property       | Type              | Description                                                   |
  | -------------- | ----------------- | ------------------------------------------------------------- |
  | `certFilePath` | string            | Path to the certificate `.pem` file.                          |
  | `keyFilePath`  | string            | Path to the private `.key` file.                              |
  | `caFilePath`   | string (optional) | Path to the private or custom certificate authority, if used. |
  | `passphrase`   | string (optional) | String of the passphrase for an encrypted private key.         |

  ```jsx  theme={null}
  const mangopay = new Mangopay({
    clientId: 'your-mangopay-client-id',
    clientApiKey: 'your-api-key',
    baseUrl: 'https://api-mtls.sandbox.mangopay.com', // mTLS base URL
    certFilePath: '/path/to/certificate.pem',
    keyFilePath: '/path/to/private.key',
    caFilePath: '/path/to/custom-ca.crt',          // optional
    passphrase: 'your-cert-passphrase',   // optional
  });
  ```

Documentation
-------------------------------------------------
[Github Full Node.js SDK Documentation](docs/README.md) is located in ``/docs`` folder.
You can also access [API References on our website](https://docs.mangopay.com/endpoints/).

License
-------------------------------------------------
MangopaySDK is distributed under MIT license, see the [LICENSE file](LICENSE).

Contacts
-------------------------------------------------
Report bugs or suggest features using
[issue tracker on GitHub](https://github.com/Mangopay/mangopay2-nodejs-sdk/issues).

Account creation
-------------------------------------------------
You can get yourself a free sandbox account or sign up for a production account by [registering on the Mangopay site](https://www.mangopay.com/start/) (note that validation of your production account involves several steps, so think about doing it in advance of when you actually want to go live).


### Creating a user

#### Using a hash of properties:
```ts
    mangopay.Users.create({
        "FirstName": "Victor",
        "LastName": "Hugo",
        "Address": "1 rue des Misérables, Paris",
        "Birthday": 1300186358,
        "Nationality": "FR",
        "CountryOfResidence": "FR",
        "Occupation": "Writer",
        "IncomeRange": "6",
        "ProofOfIdentity": null,
        "ProofOfAddress": null,
        "PersonType": "NATURAL",
        "Email": "victor@hugo.com",
        "Tag": "custom tag",
    }, function(model) {
        // User created - using callback
    }).then(function(model){
        // User created - using promise
    });
```

#### Using Mangopay SDK pre-defined models:
```ts
    var myUser = new api.models.UserLegal({
        Name: 'MangoPay',
        Email: 'info@mangopay.com',
        LegalPersonType: 'BUSINESS',
        LegalRepresentativeFirstName: 'Mango',
        LegalRepresentativeLastName: 'Pay',
        LegalRepresentativeEmail: 'mango@mangopay.com',
        HeadquartersAddress: new api.models.Address({
            AddressLine1: "4101 Reservoir Rd NW",
            AddressLine2: "",
            City: "Washington",
            Region: "District of Columbia",
            PostalCode: "20007",
            Country: "US"
        }),
        LegalRepresentativeBirthday: 1300186358,
        LegalRepresentativeNationality: 'FR',
        LegalRepresentativeCountryOfResidence: 'FR',
        CompanyNumber: 123456789,
        Tag: 'custom tag'
    });

    api.Users.create(myUser).then(function(){
        // Output the created user data to console
        console.log(myUser.Name + ' user created at ' + myUser.CreationDate);
    });
```

#### Promise vs Callback
Mangopay Node.js SDK supports both callback and promise approach.
Here is how they can be implemented :

```ts
    api.Service.method(... , function(data, response, err){
        // Callback method
    })

    api.Service.method(...).then(function(data) {
        // Promise function called
    }, function(error) {
        //exception
    })
```

### Pagination / Filtering
In order to [paginate or filter](https://docs.mangopay.com/guide/lists-pagination-management) results,
we can use ``options.parameters`` to specify these options:
```ts
    api.Transactions.getAll({
        parameters: {
            // Pagination
            per_page: 2,
            page: 2,

            // Filters
            BeforeDate: 1414000367,
            AfterDate: 1414000367,
            Nature: REGULAR,
            Status: FAILED,
            Type: TRANSFER
        }
    }
```

### Reading server response headers
For [reading the server response headers](examples/readResponseHeaders.js) we can use ``options.resolveWithFullResponse: true``
```ts
    api.Users.getAll(null, {
      parameters: {
        per_page: 1
      },
      resolveWithFullResponse: true
    }).then(function(response){
      // Read pages count
      console.log(response.headers['x-number-of-pages']);

      // Read response body
      console.log(response.body);
    });
```

Sample usage of Mangopay SDK installed with npm in a Node.js project
-------------------------------------------------
Don't forget to check examples folder !

Contributing
-------------------------------------------------
    npm start                       // installs dependencies and global mocha for testing and jsdox for documentation
    npm test                        // runs the mocha tests
    npm run-script documentation    // update documentation using jsdox, make sure to have it installed globally

Unit Tests
-------------------------------------------------
Mocha tests are placed under ``/test/`` folder. To run the tests, make sure you have all dependencies installed.
Check Contributing section for details.
