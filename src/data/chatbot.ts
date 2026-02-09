export interface ChatMessage {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export interface PredefinedQuestion {
    id: string;
    question: string;
    answer: string;
    tags: string[];
}

export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
    {
        id: 'what-is-petshack',
        question: 'What is PetShack?',
        answer: 'PetShack is Australia\'s leading pet product price comparison platform. We help you find the best prices across 40+ trusted Aussie stores, making pet care more affordable for everyone.',
        tags: ['about', 'petshack', 'what', 'platform']
    },
    {
        id: 'how-it-works',
        question: 'How does PetShack work?',
        answer: 'Simply search for any pet product, and we\'ll show you prices from multiple retailers. Click "View Deal" to purchase from your preferred store. We don\'t sell products directly - we help you find the best deals!',
        tags: ['how', 'works', 'use', 'search']
    },
    {
        id: 'is-it-free',
        question: 'Is PetShack free to use?',
        answer: 'Yes! PetShack is 100% free for all pet owners. Our goal is to make pet care more affordable for everyone in Australia.',
        tags: ['free', 'cost', 'price', 'charge']
    },
    {
        id: 'delivery',
        question: 'Do you deliver products?',
        answer: 'No, PetShack doesn\'t deliver products. We\'re a comparison platform that connects you to retailers. Each store has their own shipping policies and delivery times.',
        tags: ['delivery', 'shipping', 'deliver', 'ship']
    },
    {
        id: 'returns',
        question: 'What about returns or refunds?',
        answer: 'Since we don\'t sell products directly, all returns and refunds are handled by the retailer where you made your purchase. Please contact their customer service for assistance.',
        tags: ['return', 'refund', 'exchange', 'warranty']
    },
    {
        id: 'product-missing',
        question: 'Why can\'t I find a specific product?',
        answer: 'We\'re constantly adding new products and retailers. If you can\'t find something, try checking the spelling or browsing by category. You can also contact us to request specific products!',
        tags: ['missing', 'product', 'find', 'search', 'not found']
    },
    {
        id: 'price-accuracy',
        question: 'How accurate are the prices?',
        answer: 'We update prices regularly from our partner retailers. However, prices can change quickly. Always verify the final price on the retailer\'s website before purchasing.',
        tags: ['price', 'accurate', 'update', 'current']
    },
    {
        id: 'contact-support',
        question: 'How can I contact support?',
        answer: 'You can reach us via our Contact page, email us at support@petshack.au, or use this chat for quick questions. We typically respond within 24 hours.',
        tags: ['contact', 'support', 'help', 'email']
    }
];

export const WELCOME_MESSAGE = "G'day! 👋 Welcome to PetShack. I'm here to help you find the best deals on pet products. What would you like to know?";

export const FALLBACK_MESSAGE = "I'm not sure I understand that question. Try selecting one of the suggested questions above, or contact our support team for personalized help!";

export function findAnswerByKeywords(userInput: string): string | null {
    const input = userInput.toLowerCase().trim();

    // Direct question match
    for (const q of PREDEFINED_QUESTIONS) {
        if (q.question.toLowerCase() === input) {
            return q.answer;
        }
    }

    // Tag-based matching
    const words = input.split(/\s+/);
    let bestMatch: PredefinedQuestion | null = null;
    let maxMatches = 0;

    for (const q of PREDEFINED_QUESTIONS) {
        let matches = 0;
        for (const word of words) {
            if (q.tags.some(tag => tag.includes(word) || word.includes(tag))) {
                matches++;
            }
        }
        if (matches > maxMatches) {
            maxMatches = matches;
            bestMatch = q;
        }
    }

    // Return answer if we have at least 1 keyword match
    return maxMatches > 0 && bestMatch ? bestMatch.answer : null;
}
