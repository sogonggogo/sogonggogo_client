# 컴포넌트 패키지 구성 다이어그램

## 📊 다이어그램 보는 방법

### 방법 1: 온라인 뷰어 (가장 빠름)

1. [Mermaid Live Editor](https://mermaid.live/) 접속
2. 아래 Mermaid 코드를 복사해서 붙여넣기
3. 자동으로 그래프로 렌더링됩니다

### 방법 2: VS Code / Cursor 확장 프로그램

1. "Markdown Preview Mermaid Support" 확장 프로그램 설치
2. VS Code에서 `Cmd+Shift+V` (Mac) 또는 `Ctrl+Shift+V` (Windows)로 미리보기
3. 또는 Markdown 파일에서 우클릭 → "Open Preview"

### 방법 3: GitHub/GitLab

- 파일을 GitHub/GitLab에 올리면 자동으로 렌더링됩니다

### 방법 4: 온라인 뷰어 링크 (복사해서 접속)

```
https://mermaid.live/edit#pako:eNqVUktuwjAQ_BUrO1uJbcqlQqWXcmiR0FtXsQGLtF7WSUoq8e-VE3pBoF54WO-_2ZnZHQ3gOCAQC3S0hQBHCgKHSERKSA1aSs1N8uSZFB4OBwGqQWpqXlEQwNG9G4xEJLRXyC8NxHL1nGQv-y8ZxQHx5YmWxZXWIyGzLBOCuZv2Y0fKgXx0bqRFJqU7fSQbPCQZgGf_NW7OzCQbDRK3nCxnm5tB4r0cb7V-qCZh1tUZOAqVEpPybN1ZXcK-kpB2YzAhKzVHBpU6gQEAC1EBDaJWjFJrBCsJGdEeCzWnEaUL4xZRs1LQrFV3w1Y3pF_BVpfw1aUeYfZXE6tL_V2X4UwX
```

---

## 현재 프로젝트 구조

> 💡 **팁**: 아래 코드를 [Mermaid Live Editor](https://mermaid.live/)에 붙여넣으면 그래프로 볼 수 있습니다.
>
> **복사 방법**: ` ```mermaid`와 ` ``` `는 **제외**하고, 그 안의 내용만 복사하세요!
> 예: `graph TB`부터 시작해서 마지막 `style Utils...`까지만 복사

```mermaid
graph TB
    %% Order Domain
    subgraph "Order Pages (Controller)"
        OrderPage[OrderPage<br/>select-dish, purchase, etc.]
    end

    subgraph "Order Service"
        OrderService[OrderApiService<br/>orderApi]
    end

    subgraph "Order DTO"
        OrderDto[OrderDto<br/>types/api/order.ts]
    end

    subgraph "Order Domain"
        OrderDomain[OrderDomain<br/>types/domain/order.ts]
    end

    subgraph "Order Storage (Repository)"
        OrderStorage[orderStorage<br/>storage/order.ts]
        DeliveryStorage[deliveryStorage<br/>storage/delivery.ts]
        OrderHistoryStorage[orderHistoryStorage<br/>storage/orderHistory.ts]
    end

    %% User Domain
    subgraph "User Pages (Controller)"
        UserPage[UserPage<br/>login, signup, update-info]
    end

    subgraph "User Service"
        UserService[UserApiService<br/>userApi]
    end

    subgraph "User DTO"
        UserDto[UserDto<br/>types/api/user.ts]
    end

    subgraph "User Domain"
        UserDomain[UserDomain<br/>types/domain/user.ts]
    end

    subgraph "User Storage (Repository)"
        UserStorage[userStorage<br/>storage/user.ts]
    end

    %% Shared Components
    subgraph "UI Components"
        Components[Components<br/>order/*, login/*, main/*]
    end

    subgraph "Constants"
        Constants[Constants<br/>menus.ts, styles.ts, prices.ts]
    end

    subgraph "Utils"
        Utils[Utils<br/>calculations.ts, format.ts, menu.ts]
    end

    %% Order Domain Relationships
    OrderPage -->|calls| OrderService
    OrderPage -->|binds| OrderDto
    OrderPage -->|uses| OrderStorage
    OrderPage -->|uses| DeliveryStorage
    OrderPage -->|uses| OrderHistoryStorage
    OrderPage -->|uses| Components
    OrderPage -->|uses| Constants
    OrderPage -->|uses| Utils

    OrderService -->|uses| OrderDto
    OrderService -->|maps| OrderDomain

    OrderStorage -->|uses| OrderDomain
    DeliveryStorage -->|uses| OrderDomain
    OrderHistoryStorage -->|uses| OrderDomain

    Components -->|uses| OrderDomain
    Components -->|uses| UserDomain
    Components -->|uses| Constants
    Components -->|uses| Utils

    %% User Domain Relationships
    UserPage -->|calls| UserService
    UserPage -->|binds| UserDto
    UserPage -->|uses| UserStorage
    UserPage -->|uses| Components

    UserService -->|uses| UserDto
    UserService -->|maps| UserDomain

    UserStorage -->|uses| UserDomain

    %% Cross-domain relationships
    OrderService -.->|uses| UserService
    OrderPage -.->|uses| UserStorage

    style OrderPage fill:#e1f5ff
    style UserPage fill:#e1f5ff
    style OrderService fill:#fff4e1
    style UserService fill:#fff4e1
    style OrderDto fill:#e8f5e9
    style UserDto fill:#e8f5e9
    style OrderDomain fill:#f3e5f5
    style UserDomain fill:#f3e5f5
    style OrderStorage fill:#fff9c4
    style UserStorage fill:#fff9c4
    style DeliveryStorage fill:#fff9c4
    style OrderHistoryStorage fill:#fff9c4
    style Components fill:#e0f2f1
    style Constants fill:#fce4ec
    style Utils fill:#fce4ec
```

## 상세 컴포넌트 다이어그램 (그림 형식)

```mermaid
graph TB
    %% Order Controller Layer
    OrderController["OrderController<br/>(Pages)<br/><br/>- select-dish/page<br/>- purchase/page<br/>- delivery-info/page<br/>- change-option/page<br/>- order-complete/page"]

    %% Order Service Layer
    OrderService["OrderService<br/>(services/order.ts)<br/><br/>- createOrder()<br/>- getMyOrders()<br/>- getStaffOrders()"]

    %% Order DTO
    OrderDto["OrderDto<br/>(types/api/order.ts)<br/><br/>- OrderRequest<br/>- OrderResponse<br/>- OrderItem<br/>- OrderCustomer"]

    %% Order Domain
    OrderDomain["OrderDomain<br/>(types/domain/order.ts)<br/><br/>- OrderItem<br/>- OrderHistory<br/>- DeliveryInfo<br/>- OrderStatusType"]

    %% Repositories
    OrderRepository["OrderRepository<br/>(storage/order.ts)<br/><br/>- getOrders()<br/>- saveOrders()<br/>- addOrder()<br/>- updateOrder()"]

    DeliveryRepository["DeliveryRepository<br/>(storage/delivery.ts)<br/><br/>- getDeliveryInfo()<br/>- saveDeliveryInfo()<br/>- clearDeliveryInfo()"]

    OrderHistoryRepository["OrderHistoryRepository<br/>(storage/orderHistory.ts)<br/><br/>- getOrderHistory()<br/>- addOrderHistory()"]

    %% User Controller Layer
    UserController["UserController<br/>(Pages)<br/><br/>- login/page<br/>- signup/page<br/>- update-info/page"]

    %% User Service Layer
    UserService["UserService<br/>(services/user.ts)<br/><br/>- login()<br/>- signup()<br/>- getMe()<br/>- updateMe()"]

    %% User DTO
    UserDto["UserDto<br/>(types/api/user.ts)<br/><br/>- UserResponse<br/>- SignupRequest<br/>- CheckEmailResponse"]

    %% User Domain
    UserDomain["UserDomain<br/>(types/domain/user.ts)<br/><br/>- UserInfo"]

    %% User Repository
    UserRepository["UserRepository<br/>(storage/user.ts)<br/><br/>- getUserInfo()<br/>- saveUserInfo()<br/>- isLoggedIn()"]

    %% UI Components
    UIComponents["UI Components<br/>(components/)<br/><br/>- order/*<br/>- login/*<br/>- main/*"]

    %% Constants & Utils
    Constants["Constants<br/>(constants/)<br/><br/>- menus.ts<br/>- styles.ts<br/>- prices.ts"]

    Utils["Utils<br/>(utils/)<br/><br/>- calculations.ts<br/>- format.ts<br/>- menu.ts"]

    %% Relationships - Order Domain
    OrderController -->|"calls"| OrderService
    OrderController -->|"binds"| OrderDto
    OrderController -->|"uses"| OrderRepository
    OrderController -->|"uses"| DeliveryRepository
    OrderController -->|"uses"| OrderHistoryRepository
    OrderController -->|"uses"| UIComponents
    OrderController -->|"uses"| Constants
    OrderController -->|"uses"| Utils

    OrderService -->|"uses"| OrderDto
    OrderService -->|"maps"| OrderDomain
    OrderService -.->|"uses"| UserService

    OrderRepository -->|"uses"| OrderDomain
    DeliveryRepository -->|"uses"| OrderDomain
    OrderHistoryRepository -->|"uses"| OrderDomain

    %% Relationships - User Domain
    UserController -->|"calls"| UserService
    UserController -->|"binds"| UserDto
    UserController -->|"uses"| UserRepository
    UserController -->|"uses"| UIComponents

    UserService -->|"uses"| UserDto
    UserService -->|"maps"| UserDomain

    UserRepository -->|"uses"| UserDomain

    %% UI Components relationships
    UIComponents -->|"uses"| OrderDomain
    UIComponents -->|"uses"| UserDomain
    UIComponents -->|"uses"| Constants
    UIComponents -->|"uses"| Utils

    %% Styling
    style OrderController fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style UserController fill:#e1f5ff,stroke:#01579b,stroke-width:2px
    style OrderService fill:#fff4e1,stroke:#e65100,stroke-width:2px
    style UserService fill:#fff4e1,stroke:#e65100,stroke-width:2px
    style OrderDto fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    style UserDto fill:#e8f5e9,stroke:#1b5e20,stroke-width:2px
    style OrderDomain fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style UserDomain fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    style OrderRepository fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style DeliveryRepository fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style OrderHistoryRepository fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style UserRepository fill:#fff9c4,stroke:#f57f17,stroke-width:2px
    style UIComponents fill:#e0f2f1,stroke:#004d40,stroke-width:2px
    style Constants fill:#fce4ec,stroke:#880e4f,stroke-width:2px
    style Utils fill:#fce4ec,stroke:#880e4f,stroke-width:2px
```
