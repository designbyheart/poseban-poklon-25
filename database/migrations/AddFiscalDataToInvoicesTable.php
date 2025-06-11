<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFiscalDataToInvoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->json('fiscal_data')->nullable()->after('email');
            $table->string('fiscal_invoice_number')->nullable()->after('fiscal_data');
            $table->string('fiscal_invoice_counter')->nullable()->after('fiscal_invoice_number');
            $table->text('verification_url')->nullable()->after('fiscal_invoice_counter');
            $table->text('verification_qr_code')->nullable()->after('verification_url');
            $table->enum('invoice_type', ['normal', 'proforma', 'copy', 'training', 'advance'])->default('normal')->after('verification_qr_code');
            $table->enum('transaction_type', ['sale', 'refund'])->default('sale')->after('invoice_type');
            $table->boolean('is_fiscalized')->default(false)->after('transaction_type');

            // Add indexes
            $table->index('fiscal_invoice_number');
            $table->index('is_fiscalized');
            $table->index(['order_id', 'is_fiscalized']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('invoices', function (Blueprint $table) {
            $table->dropColumn([
                'fiscal_data',
                'fiscal_invoice_number',
                'fiscal_invoice_counter',
                'verification_url',
                'verification_qr_code',
                'invoice_type',
                'transaction_type',
                'is_fiscalized'
            ]);
        });
    }
}
