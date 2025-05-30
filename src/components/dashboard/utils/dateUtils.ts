
export const formatDate = (dateString: string) => {
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (error) {
    return dateString;
  }
};

export const formatTimeAgo = (dateString: string) => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 30) return `${diffInDays} days ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  } catch (error) {
    return 'Unknown';
  }
};

export const calculateDaysBetween = (startDate: string, endDate: string) => {
  try {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffInMs = end.getTime() - start.getTime();
    return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
  } catch (error) {
    return 0;
  }
};
