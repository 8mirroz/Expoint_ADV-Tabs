import { submitLead } from '@/app/api/lead/actions';

interface OrderItem {
    id: string;
    name: string;
    price: number;
    description: string;
    metadata?: Record<string, unknown>;
}

function formatHandoffSummary(metadata?: Record<string, unknown>): string {
    const handoffStatus = metadata?.handoffStatus;
    const handoffAssets = Array.isArray(metadata?.handoffAssets)
        ? metadata.handoffAssets as Array<{ kind?: string; filename?: string }>
        : [];
    const handoffRequirements = Array.isArray(metadata?.handoffRequirements)
        ? metadata.handoffRequirements as Array<{ label?: string; satisfied?: boolean; required?: boolean }>
        : [];

    if (!handoffStatus && handoffAssets.length === 0 && handoffRequirements.length === 0) {
        return '';
    }

    const readyRequirements = handoffRequirements.filter((item) => item.required !== false && item.satisfied).length;
    const requiredCount = handoffRequirements.filter((item) => item.required !== false).length;
    const assetSummary = handoffAssets.length > 0
        ? `; handoff-файлы=${handoffAssets.map((asset) => `${asset.kind || 'other'}:${asset.filename || '-'}`).join(', ')}`
        : '';

    return `; handoff=${String(handoffStatus || 'missing')}; evidence=${readyRequirements}/${requiredCount}${assetSummary}`;
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

function formatOrderItem(item: OrderItem): string {
    const metadata = item.metadata;
    const calculatorConfig = metadata?.calculatorConfig as {
        productType?: string;
        businessSegment?: string;
        text?: string;
        widthMm?: number;
        heightMm?: number;
        depthMm?: number;
        lighting?: string;
        mounting?: string;
        needs902Audit?: boolean;
    } | undefined;
    const selectedPackage = metadata?.selectedPackage as { title?: string; price?: number } | undefined;
    const priceBreakdown = metadata?.priceBreakdown as { total?: number; sourceSnapshot?: { version?: string; verifiedAt?: string } } | undefined;

    const setup = calculatorConfig
        ? [
            `тип=${calculatorConfig.productType || '-'}`,
            `сегмент=${calculatorConfig.businessSegment || '-'}`,
            `текст=${calculatorConfig.text || '-'}`,
            `размер=${calculatorConfig.widthMm || 0}x${calculatorConfig.heightMm || 0}x${calculatorConfig.depthMm || 0} мм`,
            `подсветка=${calculatorConfig.lighting || '-'}`,
            `монтаж=${calculatorConfig.mounting || '-'}`,
            `902-ПП=${calculatorConfig.needs902Audit ? 'да' : 'нет'}`,
        ].join('; ')
        : item.description;

    const packageLine = selectedPackage
        ? `; пакет=${selectedPackage.title}; предварительная цена=${selectedPackage.price?.toLocaleString('ru-RU')} ₽`
        : '';
    const snapshotLine = priceBreakdown?.sourceSnapshot
        ? `; snapshot=${priceBreakdown.sourceSnapshot.version} (${priceBreakdown.sourceSnapshot.verifiedAt})`
        : '';

    return `- ${item.name}: ${setup}${packageLine}${snapshotLine}${formatHandoffSummary(metadata)}`;
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
            message: `Предварительная quote-cart смета на сумму ${orderData.total} ₽\nФинальная стоимость подтверждается после инженерной проверки, фото/замера и проверки монтажного доступа.\nАдрес: ${orderData.address}${dateInfo}\n\nПозиции заказа:\n${orderData.items.map(formatOrderItem).join('\n')}`,
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
