# Rut-Chile
## Comprehensive RUT Validation and Utilities for JavaScript and TypeScript
[![Node.js CI](https://github.com/spy0x/rut-chile/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/spy0x/rut-chile/actions/workflows/main.yml)

**Rut-Chile** is a comprehensive package for working with Chilean RUTs (Rol Único Tributario) in JavaScript and TypeScript. It provides a robust validation mechanism that goes beyond the standard verification digit check, ensuring the RUT adheres to all structural and format requirements. Additionally, it offers versatile formatting and de-formatting functionalities with control over case sensitivity and hyphen.

#### **Key Features:**

* **Rigorous Validation:**
    * Validates the verification digit using the Chilean RUT algorithm.
    * Checks for invalid characters.
    * Ensures proper spacing and dash placement.
    * Verifies valid RUT lenght.
    * `validateWithResponse` function provides a detailed response object including validation status, message, and validity flag (boolean).

* **Flexible Formatting:**
    * Formats RUTs to various standard formats with configurable separators (dot or comma).
    * Case Sensitivity Control: Formats the RUT output (including the verification digit 'K') in uppercase or lowercase as desired.

* **De-formatting Options:**
    * Removes formatting characters and dashes if desired (123456789 or 12345678-9).
    * Extracts RUT from formatted strings.

* **TypeScript Support:**
    * Seamless integration with TypeScript projects.

## **Installation:**

```
npm install rut-chile
```

### **Usage:**
#### `validate(rut: string): boolean` and `validateWithResponse(rut: string): RUTResult` 
> These methods validate a Chilean RUT (Rol Único Tributario). Checks for invalid characters, spaces or improper length. And finally check if the verification digit is valid. All-in-One RUT validation!

```javascript
import RUT from 'rut-chile';

const rut = '10766555-2';

// Rut-Chile also accepts RUTs in these formats:
// 10.766.555-2 (Dotted format)
// 10,766,555-2 (Comma format)
// 107665552 (Unformatted, without separators and without hyphen)
// Accepts lowercase or uppercase for RUTs with 'k'.

console.log(RUT.validate(rut)) // Output: true
console.log(RUT.validateWithResponse(rut)) // RUTResult Object Output: { status: success, message: 'Valid RUT', payload: true}

const badRut = '10766555-k'; // Wrong verification digit

console.log(RUT.validate(badRut)) // Output: false
console.log(RUT.validateWithResponse(badRut)) // RUTResult Object Output: { status: error, message: 'Invalid check digit', payload: false}
```

#### `getDigit(rutWithoutDigit: string, toUppercase = false): string`

> Returns a RUT verification digit. Can be returned with uppercase in case of 'k' if desired. Note: it does not check for invalid characters.
```javascript
import RUT from 'rut-chile';

const rutWithoutDigit = '16591919';

// Rut-Chile also accepts RUTs in these formats:
// 16.591.919 (Dotted format)
// 16,591,919 (Comma format)
// 16591919 (Unformatted)

console.log(RUT.getDigit(rutWithoutDigit)) // Output: k
console.log(RUT.getDigit(rutWithoutDigit, true)) // Output: K
```

#### `checkDigit(rut: string): boolean`

> Returns a boolean indicating whether the check digit is valid or not. Note: it does not check for invalid characters.
```javascript
import RUT from 'rut-chile';

const rut = '10766555-2';

// Rut-Chile also accepts RUTs in these formats:
// 10.766.555-2 (Dotted format)
// 10,766,555-2 (Comma format)
// 107665552 (Unformatted)
// Accepts lower and uppercase in case of 'k'

console.log(RUT.checkDigit(rut)) // Output: true

const badRut = '10766555-3'; // bad verification digit
console.log(RUT.checkDigit(badRut)) // Output: false
```

#### `format(rut: string, withComma = false, toUpperCase = false): string`

> Returns the formatted RUT number with dots and dash. Can be returned with comma and uppercase if desired too. Note: it does not check for invalid characters.
```javascript
import RUT from 'rut-chile';

const rut = '16591919k';

// Rut-Chile also accepts RUTs in these formats:
// 16591919-k (Unformatted, only with dash)
// Accepts lowercase and uppercase in case of 'k'

console.log(RUT.format(rut)) // Output: 16.591.919-k
console.log(RUT.format(rut, true)) // Output: 16,591,919-k
console.log(RUT.format(rut, true, true)) // Output: 16,591,919-K
```

#### `deformat(rut: string, noDash = false, toUpperCase = false): string`

> Returns the RUT number without dots or commas. Can be returned without dash and with uppercase if desired too. Note: it does not check for invalid characters.
```javascript
import RUT from 'rut-chile';

const rut = '16.591.919-k';

// Rut-Chile also accepts RUTs in these formats:
// 16,591,919-k (Comma format)
// Accepts lowercase or uppercase in case of 'k'.

console.log(RUT.deformat(rut)) // Output: 16591919-k
console.log(RUT.deformat(rut, true)) // Output: 16591919k
console.log(RUT.deformat(rut, true, true)) // Output: 16591919K
```

### Individual Validations:

#### `hasTooFewChars(rut: string): boolean`

> Returns true if the RUT has too few characters, false otherwise. 
```javascript
import RUT from 'rut-chile';

const rut = '46555-5';

// Rut-Chile also accepts RUTs in these formats:
// 46.555-5 (Dotted format)
// 46,555-5 (Comma format)
// 465555 (Unformatted, without separators and without hyphen)
// Accepts lowercase or uppercase for RUTs with 'k'.

console.log(RUT.hasTooFewChars(rut)) // Output: true
```

#### `hasTooManyChars(rut: string): boolean`

> Returns true if the RUT has too many characters, false otherwise.
```javascript
import RUT from 'rut-chile';

const rut = '107665555-5';

// Rut-Chile also accepts RUTs in these formats:
// 107.665.555-5 (Dotted format)
// 107,665,555-5 (Comma format)
// 1076655555 (Unformatted, without separators and without hyphen)
// Accepts lowercase or uppercase for RUTs with 'k'.

console.log(RUT.hasTooManyChars(rut)) // Output: true
```

#### `hasInvalidChars(rut: string): boolean`

> Returns true if the RUT has invalid characters, false otherwise.
```javascript
import RUT from 'rut-chile';

const rut = '17665555-5';

// Rut-Chile also accepts RUTs in these formats:
// 17.665.555-5 (Dotted format)
// 17,665,555-5 (Comma format)
// 176655555 (Unformatted, without separators and without hyphen)
// Accepts lowercase or uppercase for RUTs with 'k'.

console.log(RUT.hasInvalidChars(rut)) // Output: false

const badRut = '1766555a-5';
console.log(RUT.hasInvalidChars(badRut)) // Output: true
```

#### `hasInvalidDash(rut: string): boolean`

> Returns true if the RUT has invalid dash, false otherwise.
```javascript
import RUT from 'rut-chile';

const rut = '17665555-5';

// Rut-Chile also accepts RUTs in these formats:
// 17.665.555-5 (Dotted format)
// 17,665,555-5 (Comma format)
// Accepts lowercase or uppercase for RUTs with 'k'.

console.log(RUT.hasInvalidDash(rut)) // Output: false

const badRut = '1766555-55';
console.log(RUT.hasInvalidChars(badRut)) // Output: true
```

#### `hasSpaces(rut: string): boolean`

> Returns true if the RUT has invalid spaces, false otherwise.
```javascript
import RUT from 'rut-chile';

const rut = '17665555-5';

// Rut-Chile also accepts RUTs in these formats:
// 17.665.555-5 (Dotted format)
// 17,665,555-5 (Comma format)
// 176655555 (Unformatted, without separators and without hyphen)
// Accepts lowercase or uppercase for RUTs with 'k'.

console.log(RUT.hasSpaces(rut)) // Output: false

const badRut = '17 665555-5';
console.log(RUT.hasSpaces(badRut)) // Output: true
```