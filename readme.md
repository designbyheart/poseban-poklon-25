# Poseban Poklon

![Poseban Poklon Logo](public/images/posebanpoklon_logo.png)

[![.github/workflows/deploy.yml](https://github.com/designbyheart/poseban-poklon-25/actions/workflows/deploy.yml/badge.svg)](https://github.com/designbyheart/poseban-poklon-25/actions/workflows/deploy.yml)

## About Poseban Poklon

Poseban Poklon ("Special Gift" in English) is an e-commerce platform specializing in gift experiences in Serbia. The application allows users to browse, purchase, and gift unique experiences to their loved ones.

## Features

- **Gift Experience Marketplace**: Browse and purchase unique gift experiences
- **User Accounts**: Register, login, and manage your profile
- **Wishlist System**: Save your favorite experiences for later
- **Order Management**: Track your orders and view order history
- **Voucher System**: Generate and redeem gift vouchers
- **Payment Processing**: Multiple payment methods supported
- **Admin Dashboard**: Comprehensive management of products, orders, and users
- **Responsive Design**: Works on desktop and mobile devices

## Technology Stack

- **Framework**: Laravel 5.8
- **PHP Version**: 7.1.3+
- **Frontend**: Vue.js, JavaScript, HTML5, CSS3
- **Database**: MySQL
- **Deployment**: Docker, Railway
- **Email**: Brevo (SendinBlue)
- **PDF Generation**: DomPDF
- **Queue Management**: Laravel Horizon
- **Testing**: Codeception

## Installation

### Prerequisites

- PHP 7.1.3 or higher
- Composer
- Node.js and NPM
- MySQL

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/designbyheart/poseban-poklon-25.git
   cd poseban-poklon
   ```

2. Install PHP dependencies:
   ```bash
   composer install
   ```

3. Install JavaScript dependencies:
   ```bash
   npm install
   ```

4. Create environment file:
   ```bash
   cp .env.example .env
   ```

5. Generate application key:
   ```bash
   php artisan key:generate
   ```

6. Configure your database in the `.env` file:
   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

7. Run migrations and seed the database:
   ```bash
   php artisan migrate --seed
   ```

8. Compile assets:
   ```bash
   npm run dev
   ```

9. Start the development server:
   ```bash
   php artisan serve
   ```

## Docker Setup

The project includes Docker configuration for easy deployment:

```bash
# Build and start containers
docker-compose up -d

# Run migrations
docker-compose exec app php artisan migrate
```

## Deployment

The project is configured for deployment on Railway with GitHub Actions CI/CD pipeline. See `.github/workflows/deploy.yml` for details.

## API Endpoints

The application provides various API endpoints for frontend interaction. Key endpoints include:

- Products: `/products/list`
- Categories: `/categories/list`
- Orders: `/orders/list`
- Wishlist: `/wishlist/list`

## Testing

Run tests using Codeception:

```bash
composer test
```

## Contact

Turistička agencija Republika 031
- Email: kontakt@posebanpoklon.rs
- Phone: +381 60 533 5325
- Address: Svetozara Lazovića Gonga 4, 31000 Užice, Serbia

## License

This project is licensed under the MIT License - see the LICENSE file for details.
