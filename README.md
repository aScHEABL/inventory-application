- If populating database by seed-scripts, the change should be incremental so something doesn't break easily.

## Fashion ecommerce database diagram
```mermaid
classDiagram
    Cloth -- ClothInstance
    Cloth -- Category
    Cloth -- Gender
    Size -- Cloth
    Color -- Cloth
    Cart -- User
    Order -- User
    Review -- User
    Review -- Cloth
    Cart -- ClothInstance

    class Cloth {
        + price: Number
        + name: String
        + size: Ref sizes Array<String>
        + description: String
        + url: String
        + gender: String
        + Category: Ref Category Array<String>
    }

    class ClothInstance {
        + Cloth: Ref Cloth
        + size: Array<String>
        + url: String
    }

    class Category {
        + name: String
        + url: String
    }

    class Gender {
        + name: String
        + url: String
    }

    class Size {
        + name: String
    }

    class Color {
        + name: String
    }

    class User {
        + username: String
        + email: String
        + password: String
        + address: String
        + cart: Array<Ref Cart>
        + orders: Array<Ref Order>
    }

    class Order {
        + date: Date
        + status: String
        + items: Array<Ref ClothInstance>
        + user: Ref User
        + reviews: Array<Ref Review>
    }

    class Review {
        + rating: Number
        + comments: String
        + user: Ref User
        + cloth: Ref Cloth
    }

    class Cart {
        + items: Ref ClothInstance<Array>
        + user: Ref User
    }

```