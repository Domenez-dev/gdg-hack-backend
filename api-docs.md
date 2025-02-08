#### **1. Badges**

- **Create Badge**: `POST /api/badges/create`
  - Body:
    ```json
    {
      "memberId": "12345",
      "name": "Gold Member"
    }
    ```

---

#### **2. Contributions**

- **Create Contribution**: `POST /api/contributions/create`
  - Body:
    ```json
    {
      "memberId": "12345",
      "taskName": "Task 1",
      "eventId": "event123",
      "taskWeight": 5
    }
    ```

---

#### **3. Events**

- **Create Event**: `POST /api/events/create`
  - Body:
    ```json
    {
      "name": "Event Name",
      "description": "Event Description",
      "date": "2023-10-01T10:00:00Z",
      "location": "Online"
    }
    ```
- **Edit Event**: `PUT /api/events/edit/:eventId`
  - Example URL: `/api/events/edit/event123`
  - Body:
    ```json
    {
      "name": "Updated Event Name"
    }
    ```

---

#### **4. Feedback**

- **Send Feedback**: `POST /api/feedback/send`
  - Body:
    ```json
    {
      "toEmail": "user@example.com",
      "type": "warning" // or "appreciation"
    }
    ```

---

#### **5. Fetch Sheet Data**

- **Fetch Data**: `GET /api/fetch-sheet-data/fetch-sheet-data`

---

#### **6. Members**

- **Create Member**: `POST /api/members/create`
  - Body:
    ```json
    {
      "name": "John Doe",
      "email": "john.doe@example.com",
      "discordId": "discord123"
    }
    ```
- **Edit Member**: `PUT /api/members/edit/:memberId`
  - Example URL: `/api/members/edit/member123`
  - Body:
    ```json
    {
      "name": "Updated Name"
    }
    ```
- **Delete Member**: `DELETE /api/members/delete/:memberId`
  - Example URL: `/api/members/delete/member123`

---

#### **7. Send Email**

- **Send Welcome Email**: `POST /api/send-email/api/send-welcome-email`
  - Body:
    ```json
    {
      "to": "user@example.com",
      "username": "JohnDoe"
    }
    ```

---

#### **8. Users**

- **Login User**: `POST /api/users/login`
  - Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```
- **Logout User**: `POST /api/users/logout`

---

#### **9. Discord Roles**

- **Create Role**: `POST /api/discord-roles/create`
  - Body:
    ```json
    {
      "roleName": "New Role"
    }
    ```
- **Edit Role**: `PUT /api/discord-roles/edit/:roleId`
  - Example URL: `/api/discord-roles/edit/role123`
  - Body:
    ```json
    {
      "roleName": "Updated Role"
    }
    ```
- **Delete Role**: `DELETE /api/discord-roles/delete/:roleId`
  - Example URL: `/api/discord-roles/delete/role123`

---

### **4. Run and Test the Application**

1. Start your server:

   ```bash
   node app.js
   ```

2. Use Postman or curl to test each API endpoint. For example:
   - Test creating a badge:
     ```bash
     curl -X POST http://localhost:3000/api/badges/create \
          -H "Content-Type: application/json" \
          -d '{"memberId": "12345", "name": "Gold Member"}'
     ```
