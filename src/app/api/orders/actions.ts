import { submitLead } from '@/app/api/leads/actions';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    description: string;
    metadata?: any;
}

interface OrderData {
    name: string;
    email: string;
    phone: string;
    company: string;
    address: string;
    items: OrderItem[];
    total: number;
    readinessDate?: Date;
    deliveryDate?: Date;
}

export async function submitOrder(orderData: OrderData) {
    try {
        const dateInfo = orderData.readinessDate && orderData.deliveryDate
            ? `\nДата готовности: ${orderData.readinessDate.toLocaleDateString('ru-RU')}\nДата доставки: ${orderData.deliveryDate.toLocaleDateString('ru-RU')}`
            : '';

        // Создаем заявку в CRM
        const result = await submitLead({
            name: orderData.name,
            phone: orderData.phone,
            service: 'Заказ через корзину',
            consent: true,
            turnstileToken: 'none',
            email: orderData.email,
            message: `Заказ на сумму ${orderData.total} ₽\nАдрес: ${orderData.address}${dateInfo}\n\nПозиции заказа:\n${orderData.items.map(item => `- ${item.name}: ${item.description}`).join('\n')}`,
        });

        // Очищаем корзину после успешного создания заказа
        // Здесь будет код для очистки корзины
        if (result.success) {
            return { success: true, message: 'Заказ успешно отправлен' };
        } else {
            return { success: false, message: 'Ошибка при отправке заказа' };
        }
    } catch (error) {
        console.error('Order submission error:', error);
        return { success: false, message: 'Ошибка при отправке заказа' };
    }
}