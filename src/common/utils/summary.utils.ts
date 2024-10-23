import { Model } from 'mongoose';

export async function getSummary<T>(
    model: Model<T>,
    userId: string,
    period: 'today' | 'week' | 'month' | 'year'
) {
    const matchCriteria = getMatchCriteria(period, userId);

    return model.aggregate([
        { $match: matchCriteria },
        {
            $group: {
                _id: null,
                totalAmount: { $sum: '$amount' },
            },
        },
    ]);
}

function getMatchCriteria(period: string, userId: string) {
    const startOfToday = new Date();
    const startOfWeek = new Date();
    const startOfMonth = new Date();
    const startOfYear = new Date();

    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfMonth.setDate(1);
    startOfYear.setMonth(0, 1);

    switch (period) {
        case 'today':
            return { userId, createdAt: { $gte: startOfToday } };
        case 'week':
            return { userId, createdAt: { $gte: startOfWeek } };
        case 'month':
            return { userId, createdAt: { $gte: startOfMonth } };
        case 'year':
            return { userId, createdAt: { $gte: startOfYear } };
        default:
            return {};
    }
}
