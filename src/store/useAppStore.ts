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

export type ApiStatus = 'idle' | 'loading' | 'ready' | 'error';

interface DashboardBudgetResponse {
  id: number;
  category: string;
  monthly_limit: number;
  current_spent: number;
  usage_percent: number;
}

interface DashboardGoalResponse {
  id: number;
  name: string;
  deadline: string | null;
  progress_percent: number;
  current_amount: number;
  target_amount: number;
}

interface DashboardResponse {
  character_name: string;
  character_class: string;
  avatar_style?: string;
  level: number;
  xp: number;
  xp_to_next_level: number;
  streak_count: number;
  total_income: number;
  total_expenses: number;
  net_savings: number;
  savings_rate: number;
  budgets: DashboardBudgetResponse[];
  active_goals: DashboardGoalResponse[];
}

interface ExpenseResponse {
  id: number;
  amount: number;
  category: string;
  description: string | null;
  date_spent: string;
}

interface IncomeResponse {
  id: number;
  name: string;
  amount: number;
  income_type: string;
  date_received: string;
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
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
  customCursorEnabled: boolean;
  isSidebarCollapsed: boolean;
  apiStatus: ApiStatus;
  apiError?: string;
  userId?: number;

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
  loadBackendData: () => Promise<void>;
  addTransaction: (tx: Omit<Transaction, 'id'>) => Promise<void>;
  contributeQuest: (questId: string, amount: number) => Promise<void>;
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const categoryIcons: Record<string, string> = {
  bills: 'bolt',
  rent: 'home',
  goal_purchase: 'savings',
  useless: 'warning',
  food: 'restaurant',
  transport: 'directions_car',
  health: 'health_and_safety',
  entertainment: 'sports_esports',
  subscription: 'subscriptions',
  savings: 'savings',
  investments: 'memory',
  other: 'payments',
};

const categoryLabels: Record<string, string> = {
  bills: 'Utilities',
  rent: 'Shelter',
  goal_purchase: 'Goal Purchase',
  useless: 'Impulse',
  food: 'Food & Sustenance',
  transport: 'Transit',
  health: 'Health',
  entertainment: 'Entertainment',
  subscription: 'Subscriptions',
  savings: 'Savings',
  investments: 'Upgrades',
  other: 'Other',
};

const expenseCategoryByLabel: Record<string, string> = {
  Groceries: 'food',
  Salary: 'other',
  Utilities: 'bills',
  Entertainment: 'entertainment',
  Consumables: 'food',
  Transfer: 'other',
};

const toIsoDate = () => new Date().toISOString().slice(0, 10);

const formatDate = (value: string) => {
  const date = new Date(`${value}T00:00:00`);
  const today = new Date();
  const midnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const diffDays = Math.round((midnight.getTime() - date.getTime()) / 86400000);

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

const findCharacterForBackend = (dashboard: { avatar_style?: string; character_class?: string }) => {
  return (
    CHARACTERS.find((character) => character.id === dashboard.avatar_style) ||
    CHARACTERS.find((character) => character.id === 'vanguard') ||
    CHARACTERS[0]
  );
};

export const useAppStore = create<AppState>((set) => ({
  agentName: 'Loading...',
  agentClass: 'Fiscal Vanguard',
  level: 1,
  xp: 0,
  maxXp: 100,
  streakDays: 0,
  totalBalance: 0,
  totalIncome: 0,
  totalExpenses: 0,
  netSavings: 0,
  savingsRate: 0,
  customCursorEnabled: true,
  isSidebarCollapsed: false,
  apiStatus: 'idle',

  selectedCharacter: CHARACTERS[0],

  transactions: [],

  quests: [],

  budgets: [],

  isAddTransactionOpen: false,

  setAgentName: (name) => set({ agentName: name }),
  setSelectedCharacter: (character) => set({ selectedCharacter: character, agentClass: character.classTitle }),
  toggleCustomCursor: () => set((state) => ({ customCursorEnabled: !state.customCursorEnabled })),
  toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
  setAddTransactionOpen: (open) => set({ isAddTransactionOpen: open }),

  loadBackendData: async () => {
    try {
      set({ apiStatus: 'loading', apiError: undefined });
      const bootstrap = await apiFetch<{ user_id: number }>('/demo/bootstrap', { method: 'POST' });
      const userId = bootstrap.user_id;
      const [dashboard, expenses, income] = await Promise.all([
        apiFetch<DashboardResponse>(`/users/${userId}/dashboard/`),
        apiFetch<ExpenseResponse[]>(`/users/${userId}/expenses/`),
        apiFetch<IncomeResponse[]>(`/users/${userId}/income/`),
      ]);

      const selectedCharacter = findCharacterForBackend(dashboard);
      const debitTransactions: Transaction[] = expenses.map((expense) => ({
        id: `expense-${expense.id}`,
        icon: categoryIcons[expense.category] || 'shopping_cart',
        entity: expense.description || categoryLabels[expense.category] || 'Expense',
        category: categoryLabels[expense.category] || expense.category,
        date: formatDate(expense.date_spent),
        amount: Number(expense.amount),
        type: 'debit',
      }));
      const creditTransactions: Transaction[] = income.map((item) => ({
        id: `income-${item.id}`,
        icon: item.income_type === 'regular' ? 'work' : 'payments',
        entity: item.name,
        category: item.income_type === 'regular' ? 'Salary' : 'Transfer',
        date: formatDate(item.date_received),
        amount: Number(item.amount),
        type: 'credit',
      }));

      const transactions = [...debitTransactions, ...creditTransactions].sort((a, b) => {
        if (a.date === 'Today') return -1;
        if (b.date === 'Today') return 1;
        if (a.date === 'Yesterday') return -1;
        if (b.date === 'Yesterday') return 1;
        return 0;
      });

      set({
        userId,
        agentName: dashboard.character_name,
        agentClass: selectedCharacter.classTitle,
        level: dashboard.level,
        xp: dashboard.xp,
        maxXp: dashboard.xp_to_next_level,
        streakDays: dashboard.streak_count,
        totalBalance: dashboard.net_savings,
        totalIncome: dashboard.total_income,
        totalExpenses: dashboard.total_expenses,
        netSavings: dashboard.net_savings,
        savingsRate: dashboard.savings_rate,
        selectedCharacter,
        transactions,
        budgets: dashboard.budgets.map((budget) => {
          const usage = Number(budget.usage_percent);
          return {
            id: String(budget.id),
            category: categoryLabels[budget.category] || budget.category,
            icon: categoryIcons[budget.category] || 'account_balance_wallet',
            spent: Number(budget.current_spent),
            limit: Number(budget.monthly_limit),
            status: usage >= 90 ? 'warning' : usage <= 50 ? 'optimal' : 'normal',
          };
        }),
        quests: dashboard.active_goals.map((goal) => {
          const pct = Number(goal.progress_percent);
          return {
            id: String(goal.id),
            title: goal.name,
            estCompletion: goal.deadline
              ? new Date(`${goal.deadline}T00:00:00`).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }).toUpperCase()
              : 'NO DEADLINE',
            imageUrl: `/avatars.png`,
            currentAmount: Number(goal.current_amount),
            targetAmount: Number(goal.target_amount),
            status: pct >= 100 ? 'COMPLETED' : pct >= 85 ? 'NEAR COMPLETION' : 'IN PROGRESS',
          };
        }),
        apiStatus: 'ready',
      });
    } catch (error) {
      set({
        apiStatus: 'error',
        apiError: error instanceof Error ? error.message : 'Unable to load backend data',
      });
    }
  },

  addTransaction: async (tx) => {
    const state = useAppStore.getState();
    if (!state.userId) {
      await state.loadBackendData();
    }
    const userId = useAppStore.getState().userId;
    if (!userId) return;

    if (tx.type === 'credit') {
      await apiFetch(`/users/${userId}/income/`, {
        method: 'POST',
        body: JSON.stringify({
          name: tx.entity,
          amount: tx.amount,
          income_type: tx.category === 'Salary' ? 'regular' : 'miscellaneous',
          description: tx.category,
          date_received: toIsoDate(),
          is_recurring: tx.category === 'Salary',
        }),
      });
    } else {
      await apiFetch(`/users/${userId}/expenses/`, {
        method: 'POST',
        body: JSON.stringify({
          amount: tx.amount,
          category: expenseCategoryByLabel[tx.category] || 'other',
          description: tx.entity,
          date_spent: toIsoDate(),
          is_automated: false,
        }),
      });
    }

    await useAppStore.getState().loadBackendData();
  },

  contributeQuest: async (questId, amount) => {
    const state = useAppStore.getState();
    const userId = state.userId;
    const quest = state.quests.find((item) => item.id === questId);
    if (!userId || !quest) return;

    await apiFetch(`/users/${userId}/goals/${questId}`, {
      method: 'PATCH',
      body: JSON.stringify({
        current_amount: Math.min(quest.targetAmount, quest.currentAmount + amount),
      }),
    });

    await useAppStore.getState().loadBackendData();
  }
}));
