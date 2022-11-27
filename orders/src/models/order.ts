import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { OrderStatus } from '@tntickets/common';
import { TicketDoc } from './ticket';

export { OrderStatus };

// Our custom mongoose schema for orders. It has all of our desired properties that we've specified.
interface OrderAttrs {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc;
}

// The difference between 'OrderDoc' and 'OrderAttrs' is that mongoose/mongoDB may choose to add its own properties, e.g. createdAt, updatedAt, etc., to our 'OrderAttrs'
// schema from above. These added properties will throw an error in TypeScript unless they are specified in a separate interface, which is the purpose of 'OrderDoc'. We
// are essentially future-proofing TypeScript for when mongoDB eventually adds its own properties to our schema.
interface OrderDoc extends mongoose.Document {
    userId: string;
    status: OrderStatus;
    expiresAt: Date;
    ticket: TicketDoc; 
    version: number;   
}

interface OrderModel extends mongoose.Model<OrderDoc> {
    build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    }, 
    status: {
        type: String,
        required: true, 
        enum: Object.values(OrderStatus), 
        default: OrderStatus.Created
    }, 
    expiresAt: {
        type: mongoose.Schema.Types.Date
    }, 
    ticket: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Ticket'
    }
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id;
            delete ret._id;            
        }
    }
});

orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

orderSchema.statics.build = (attrs: OrderAttrs) => {
    return new Order(attrs);
};

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };