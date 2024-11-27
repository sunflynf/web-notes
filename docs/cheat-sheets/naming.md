---
description: How to naming things in code.
tags:
  - Clean code
---

# Naming styles

## hy-phens

- **HTML**'s attributes - id, class

  ```html
  <div id="main-form" class="form-group">
    <label class="form-label">
      <input type="text" class="form-input" aria-label="main-form-input" />
    </label>
  </div>
  ```

- Name of helpers/utils files or folder
  ```txt
  currency-transfer
  utils/date-time-format.js
  ```
- Version Control
  ```txt
  features/dialog-info
  tasks/dialog-info-header
  ```

## under_score

- Database variables

  ```sql
  SELECT user.id AS user_id, user.name AS user_name, invoice.total_price
  FROM user, invoice
  WHERE user.id = invoice.user_id;
  ```

- Test case (combine with lowerCamelCase)
  ```java
  // [methodUnderTest]_[scenario]_[expectedResult]
  @Test
  public void getNewAddress_thenSetDefault_resultNewAddressIsDefault() {}
  ```
- _Optional_: use for **variables** in Code (languages allow)

## UpperCamelCase (PascalCase)

- `class` in OOP languages

  ```java
  public class Account {}
  public abstract class Product {}
  public final class User {}
  ```

- **React**'s components
  ```jsx
  <Modal/>
  <Button/>
  <ButtonGroup/>
  <Sidebar/>
  ```

## lowerCamelCase

- **Variables**

  ```ts
  let firstName: String;
  let lastName: String;
  let address: Address;
  ```

- **Function**'s name
  ```js
  function getProducts() {}
  function setProduct() {}
  function getTotalPrice() {}
  ```
