@extends('layouts.dashboard')

@section('content')
    <div class="container-fluid">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header">
                        <h3 class="card-title">Fiscal Invoice Management</h3>
                        <div class="card-tools">
                            <button type="button" class="btn btn-success btn-sm" id="check-status">
                                <i class="fas fa-heartbeat"></i> Check Service Status
                            </button>
                        </div>
                    </div>
                    <div class="card-body">

                        <!-- Service Status -->
                        <div class="row mb-3">
                            <div class="col-12">
                                <div id="status-alert" class="alert" style="display: none;"></div>
                            </div>
                        </div>

                        <!-- Send Invoice for Single Order -->
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h5>Send Invoice for Order</h5>
                                    </div>
                                    <div class="card-body">
                                        <form id="single-invoice-form">
                                            <div class="form-group">
                                                <label for="order-id">Order ID</label>
                                                <input type="number" class="form-control" id="order-id" name="order_id" required>
                                            </div>
                                            <button type="submit" class="btn btn-primary">Send Invoice</button>
                                            <button type="button" class="btn btn-warning ml-2" id="retry-invoice">Retry Invoice</button>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <!-- Bulk Send Invoices -->
                            <div class="col-md-6">
                                <div class="card">
                                    <div class="card-header">
                                        <h5>Bulk Send Invoices</h5>
                                    </div>
                                    <div class="card-body">
                                        <form id="bulk-invoice-form">
                                            <div class="form-group">
                                                <label for="order-ids">Order IDs (comma separated)</label>
                                                <textarea class="form-control" id="order-ids" name="order_ids" rows="3"
                                                          placeholder="1,2,3,4,5"></textarea>
                                            </div>
                                            <button type="submit" class="btn btn-success">Send Bulk Invoices</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Results -->
                        <div class="row">
                            <div class="col-12">
                                <div id="results" style="display: none;">
                                    <h5>Results</h5>
                                    <div id="results-content"></div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        $(document).ready(function() {
            // Check service status
            $('#check-status').click(function() {
                $.get('{{ route("fiscal.status") }}')
                    .done(function(response) {
                        showAlert(response.success ? 'success' : 'warning', response.message);
                    })
                    .fail(function() {
                        showAlert('danger', 'Failed to check service status');
                    });
            });

            // Send single invoice
            $('#single-invoice-form').submit(function(e) {
                e.preventDefault();
                const orderId = $('#order-id').val();

                $.get(`/fiscal/send/${orderId}`)
                    .done(function(response) {
                        showAlert(response.success ? 'success' : 'danger', response.message);
                        if (response.success) {
                            showResults([response]);
                        }
                    })
                    .fail(function() {
                        showAlert('danger', 'Failed to send invoice');
                    });
            });

            // Retry invoice
            $('#retry-invoice').click(function() {
                const orderId = $('#order-id').val();
                if (!orderId) {
                    showAlert('warning', 'Please enter an order ID');
                    return;
                }

                $.post(`/fiscal/retry/${orderId}`, {
                    _token: '{{ csrf_token() }}',
                    max_retries: 3
                })
                    .done(function(response) {
                        showAlert(response.success ? 'success' : 'danger', response.message);
                        if (response.success) {
                            showResults([response]);
                        }
                    })
                    .fail(function() {
                        showAlert('danger', 'Failed to retry invoice');
                    });
            });

            // Bulk send invoices
            $('#bulk-invoice-form').submit(function(e) {
                e.preventDefault();
                const orderIds = $('#order-ids').val().split(',').map(id => parseInt(id.trim())).filter(id => !isNaN(id));

                $.post('{{ route("fiscal.bulk") }}', {
                    _token: '{{ csrf_token() }}',
                    order_ids: orderIds
                })
                    .done(function(response) {
                        showAlert(response.success ? 'success' : 'warning', response.message);
                        showResults(response.results);
                    })
                    .fail(function() {
                        showAlert('danger', 'Failed to send bulk invoices');
                    });
            });

            function showAlert(type, message) {
                $('#status-alert')
                    .removeClass('alert-success alert-danger alert-warning alert-info')
                    .addClass(`alert-${type}`)
                    .text(message)
                    .show();
            }

            function showResults(results) {
                let html = '<div class="table-responsive"><table class="table table-striped"><thead><tr><th>Order ID</th><th>Status</th><th>Message</th></tr></thead><tbody>';

                results.forEach(result => {
                    const status = result.success ? '<span class="badge badge-success">Success</span>' : '<span class="badge badge-danger">Failed</span>';
                    html += `<tr><td>${result.order_id || 'N/A'}</td><td>${status}</td><td>${result.message}</td></tr>`;
                });

                html += '</tbody></table></div>';

                $('#results-content').html(html);
                $('#results').show();
            }
        });
    </script>
@endsection
