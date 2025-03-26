
import { ResponseTone } from '@/hooks/dashboard/useAIResponseGenerator';

export interface Template {
  id: string;
  name: string;
  content: string;
  tone: ResponseTone;
}

// Get tone badge color based on tone
export const getToneBadgeColor = (tone: ResponseTone): string => {
  switch (tone) {
    case 'professional': return 'bg-blue-100 text-blue-800';
    case 'friendly': return 'bg-green-100 text-green-800';
    case 'apologetic': return 'bg-amber-100 text-amber-800';
    case 'enthusiastic': return 'bg-purple-100 text-purple-800';
    case 'formal': return 'bg-gray-100 text-gray-800';
    case 'grateful': return 'bg-pink-100 text-pink-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Filter templates based on search query and tone filter
export const filterTemplates = (
  templates: Template[], 
  searchQuery: string, 
  toneFilter: ResponseTone | 'all'
): Template[] => {
  return templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          template.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTone = toneFilter === 'all' || template.tone === toneFilter;
    
    return matchesSearch && matchesTone;
  });
};

// Save templates to localStorage
export const saveTemplatesToStorage = (templates: Template[]): void => {
  try {
    localStorage.setItem('responseTemplates', JSON.stringify(templates));
  } catch (error) {
    console.error('Error saving templates to localStorage:', error);
  }
};

// Load templates from localStorage
export const loadTemplatesFromStorage = (): Template[] => {
  try {
    const savedTemplates = localStorage.getItem('responseTemplates');
    return savedTemplates ? JSON.parse(savedTemplates) : [];
  } catch (error) {
    console.error('Error loading templates from localStorage:', error);
    return [];
  }
};
