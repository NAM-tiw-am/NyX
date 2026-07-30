import { create } from 'zustand';

export interface Character {
  id: string;
  name: string;
  classTitle: string;
  spriteBgPos: string;
  spriteBgSize: string;
  str: number;
  wis: number;
  dex: number;
  con: number;
}

export interface Transaction {
  id: string;
  icon: string;
  entity: string;
  category: string;
  date: string;
  amount: number;
  type: 'debit' | 'credit';
}

export interface Quest {
  id: string;
  title: string;
  estCompletion: string;
  imageUrl: string;
  currentAmount: number;
  targetAmount: number;
  status: 'IN PROGRESS' | 'NEAR COMPLETION' | 'COMPLETED';
}

export interface Budget {
  id: string;
  category: string;
  icon: string;
  spent: number;
  limit: number;
  status: 'normal' | 'warning' | 'optimal';
}

export interface AppState {
  // User & Level Info
  agentName: string;
  agentClass: string;
  level: number;
  xp: number;
  maxXp: number;
  streakDays: number;
  totalBalance: number;
  customCursorEnabled: boolean;
  isSidebarCollapsed: boolean;

  // Selected Avatar
  selectedCharacter: Character;

  // Transactions, Quests, Budgets
  transactions: Transaction[];
  quests: Quest[];
  budgets: Budget[];

  // Modals / Triggers
  isAddTransactionOpen: boolean;

  // Actions
  setAgentName: (name: string) => void;
  setSelectedCharacter: (character: Character) => void;
  toggleCustomCursor: () => void;
  toggleSidebar: () => void;
  setAddTransactionOpen: (open: boolean) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  contributeQuest: (questId: string, amount: number) => void;
}

export const CHARACTERS: Character[] = [
  {
    id: 'vanguard',
    name: 'VANGUARD',
    classTitle: 'Fiscal Vanguard',
    spriteBgPos: '4% 1%',
    spriteBgSize: '360% 360%',
    str: 85,
    wis: 90,
    dex: 65,
    con: 80
  },
  {
    id: 'pathfinder',
    name: 'PATHFINDER',
    classTitle: 'Torch Navigator',
    spriteBgPos: '50% 1%',
    spriteBgSize: '360% 360%',
    str: 70,
    wis: 85,
    dex: 90,
    con: 60
  },
  {
    id: 'ranger',
    name: 'RANGER',
    classTitle: 'Asset Archer',
    spriteBgPos: '96% 1%',
    spriteBgSize: '360% 360%',
    str: 75,
    wis: 78,
    dex: 95,
    con: 55
  },
  {
    id: 'shadow',
    name: 'SHADOW',
    classTitle: 'Ledger Operative',
    spriteBgPos: '4% 48%',
    spriteBgSize: '360% 360%',
    str: 65,
    wis: 95,
    dex: 92,
    con: 50
  },
  {
    id: 'mystic',
    name: 'MYSTIC',
    classTitle: 'Yield Witch',
    spriteBgPos: '50% 48%',
    spriteBgSize: '360% 360%',
    str: 60,
    wis: 99,
    dex: 75,
    con: 40
  },
  {
    id: 'sorcerer',
    name: 'SORCERER',
    classTitle: 'Capital Mage',
    spriteBgPos: '96% 48%',
    spriteBgSize: '360% 360%',
    str: 55,
    wis: 96,
    dex: 80,
    con: 45
  },
  {
    id: 'berserker',
    name: 'BERSERKER',
    classTitle: 'Debt Destroyer',
    spriteBgPos: '4% 96%',
    spriteBgSize: '360% 360%',
    str: 95,
    wis: 70,
    dex: 60,
    con: 90
  },
  {
    id: 'scholar',
    name: 'SCHOLAR',
    classTitle: 'Vault Monk',
    spriteBgPos: '50% 96%',
    spriteBgSize: '360% 360%',
    str: 50,
    wis: 98,
    dex: 70,
    con: 65
  },
  {
    id: 'goblin',
    name: 'GOBLIN',
    classTitle: 'Coin Hoarder',
    spriteBgPos: '96% 96%',
    spriteBgSize: '360% 360%',
    str: 80,
    wis: 82,
    dex: 90,
    con: 75
  }
];

export const useAppStore = create<AppState>((set) => ({
  agentName: 'OVERCLOCK_Agent_42',
  agentClass: 'Fiscal Vanguard',
  level: 42,
  xp: 850,
  maxXp: 1000,
  streakDays: 15,
  totalBalance: 12450.00,
  customCursorEnabled: true,
  isSidebarCollapsed: false,

  selectedCharacter: CHARACTERS[0],

  transactions: [
    { id: '1', icon: 'shopping_cart', entity: 'Neon Market', category: 'Groceries', date: 'Today', amount: 124.50, type: 'debit' },
    { id: '2', icon: 'work', entity: 'MegaCorp Inc.', category: 'Salary', date: 'Yesterday', amount: 3200.00, type: 'credit' },
    { id: '3', icon: 'bolt', entity: 'Grid Power', category: 'Utilities', date: 'Oct 24', amount: 85.00, type: 'debit' },
    { id: '4', icon: 'sports_esports', entity: 'Steam', category: 'Entertainment', date: 'Oct 22', amount: 59.99, type: 'debit' },
    { id: '5', icon: 'payments', entity: 'Alex P.', category: 'Transfer', date: 'Oct 20', amount: 25.00, type: 'credit' },
    { id: '6', icon: 'coffee', entity: 'Neuro-Brew Cafe', category: 'Consumables', date: 'Oct 19', amount: 12.00, type: 'debit' },
    { id: '7', icon: 'directions_bus', entity: 'HoverTransit Auth', category: 'Transport', date: 'Oct 18', amount: 4.50, type: 'debit' }
  ],

  quests: [
    {
      id: 'q1',
      title: 'New Rig',
      estCompletion: 'OCT 2024',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA2i3SHRGOPrU-uS4m1HBKP-mDWj7CCZTDj8NH9QoxKGuv4camlnq8YTEwEgCW3PXy2jeV2sjm6ZfJTHnA297_giP7sX54pEAuQmIQ2b98HGFzEo-MI6dSJ52jERKFZTC_2eyU4WcmyIX1jFRmvtWNRhkghoS8X4KM2hGrSIV9IVNuju8tye8GpptXPpnhxEOpHyeZeN6DfJ0JBYtuE-TRUkmE9dunq4nDZdNigH1D-TJ74OVOChyJtNg',
      currentAmount: 1200.00,
      targetAmount: 2500.00,
      status: 'IN PROGRESS'
    },
    {
      id: 'q2',
      title: 'Emergency Fund',
      estCompletion: 'DEC 2025',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAXf2eaQOemu4A4ukBlG-iY-rPR8fQ4zDU7Z8uBxKN7trI66fXfm6kHi-xzHOMAqcOq1NwlxSVEAm9UJUvCbRRKdrExdmSXsqRIORYDe7AlmGnARKwOAEBx6Xk5WDji2Uhx_FGBMv7pNDj85sERCIiPEhdGeeJZUpBELHtcFxtp88zoemqyauuA-yg7D_GdT0kc1-RxXs5rfLIZerSEj2jGyIsGNjWe_mKG9GvWjydjwLDPAcvywtmWnw',
      currentAmount: 4500.00,
      targetAmount: 10000.00,
      status: 'IN PROGRESS'
    },
    {
      id: 'q3',
      title: 'Off-Grid Trip',
      estCompletion: 'JUL 2024',
      imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB9lODqDOGXOcFNv9uULdKwY6wiW-CqS6gDf2msVBvkIJG5gfSSgItWzgokEATFWSUFAm41zsyWi2h0GDD7Jh3VDEslsOU2wUulZ64-sQYUyPi1AjMF_EdkUGbRvgz79pMw6pSvKXmNV3vor24uUl2yBQeok6oiGqg9QBfFJJGQRr711edX5CAe_6Xlc02xF2q8BErS3XcsglWoZFxL0z_JNiLCvlACPy0uswrhNa4LxN5kUnbve9yu_g',
      currentAmount: 1850.00,
      targetAmount: 2000.00,
      status: 'NEAR COMPLETION'
    }
  ],

  budgets: [
    { id: 'b1', category: 'Food & Sustenance', icon: 'restaurant', spent: 450, limit: 600, status: 'normal' },
    { id: 'b2', category: 'Shelter', icon: 'home', spent: 1450, limit: 1500, status: 'warning' },
    { id: 'b3', category: 'Upgrades', icon: 'memory', spent: 120, limit: 300, status: 'optimal' },
    { id: 'b4', category: 'Transit', icon: 'directions_car', spent: 180, limit: 200, status: 'normal' }
  ],

  isAddTransactionOpen: false,

  setAgentName: (name) => set({ agentName: name }),
  setSelectedCharacter: (character) => set({ selectedCharacter: character, agentClass: character.classTitle }),
  toggleCustomCursor: () => set((state) => ({ customCursorEnabled: !state.customCursorEnabled })),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setAddTransactionOpen: (open) => set({ isAddTransactionOpen: open }),
  
  addTransaction: (tx) => set((state) => ({
    transactions: [{ ...tx, id: Date.now().toString() }, ...state.transactions],
    xp: Math.min(state.maxXp, state.xp + 25)
  })),

  contributeQuest: (questId, amount) => set((state) => ({
    quests: state.quests.map((q) => {
      if (q.id === questId) {
        const newAmt = Math.min(q.targetAmount, q.currentAmount + amount);
        const status = newAmt >= q.targetAmount ? 'COMPLETED' : (newAmt / q.targetAmount > 0.85 ? 'NEAR COMPLETION' : 'IN PROGRESS');
        return { ...q, currentAmount: newAmt, status };
      }
      return q;
    })
  }))
}));
