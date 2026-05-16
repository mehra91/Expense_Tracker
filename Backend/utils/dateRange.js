export const getDateRange = (range) => {
    const now = new Date();
    let start, end;

    switch(range) {

        case 'weekly':
            start = new Date(now);
            start.setDate(now.getDate() - 7);  // 7 days ago
            end = now;
            break;

        case 'monthly':
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            // first day of current month
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
            // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            // last day of current month
            break;

        case 'yearly':
            start = new Date(now.getFullYear(), 0, 1);
            // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            // first day of current year (Jan 1)
            end = new Date(now.getFullYear(), 11, 31);
            // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
            // last day of current year (Dec 31)
            break;

        default:
            // default monthly
            start = new Date(now.getFullYear(), now.getMonth(), 1);
            end = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }

    return { start, end };
}