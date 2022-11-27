export enum OrderStatus {
    // When the order has been created, but the ticket has not been reserved.
    Created = 'created',
    
    // The ticket the order is trying to reserve has already been reserved or when the user has cancelled the order. Additionally, the order has expired before payment.
    Cancelled = 'cancelled', 

    // The order has successfully reserved the ticket.
    AwaitingPayment = 'awaiting:payment', 

    // The order has reserved the ticket and the user has provided payment successfully.
    Complete = 'complete'
}