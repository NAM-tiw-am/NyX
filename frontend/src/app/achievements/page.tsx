'use client';

import { useAppStore } from '@/store/useAppStore';
import AvatarIcon from '@/components/ui/AvatarIcon';

export default function AchievementsPage() {
  const { level, xp, maxXp, selectedCharacter, isSidebarCollapsed } = useAppStore();

  return (
    <main className={`pt-20 lg:pt-8 pb-24 lg:pb-8 p-4 sm:p-8 max-w-7xl mx-auto min-h-screen transition-all duration-300 ${
      isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
    }`}>
      {/* Hero Section */}
      <div className="bg-[#1a1a1a] border-[3px] border-black p-6 sm:p-8 brutalist-shadow mb-10 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-[3px] border-black pb-6 mb-6">
          <div>
            <h1 className="font-space text-3xl sm:text-5xl font-bold text-white uppercase tracking-tighter">
              Combat Log
            </h1>
            <p className="font-mono text-xs text-[#c6c6c6]">{'// RECORD OF FINANCIAL DISCIPLINE & TROPHIES'}</p>
          </div>

          {/* Avatar + Level Badge */}
          <div className="flex items-center gap-3 bg-[#131313] border-[3px] border-black px-4 py-2 brutalist-shadow">
            <AvatarIcon character={selectedCharacter} size="md" />
            <div>
              <div className="font-space font-bold text-white text-sm uppercase">LEVEL {level} PROFILE</div>
              <div className="font-mono text-[10px] text-[#77da9f] font-bold">RANK #4,281</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#131313] border-[3px] border-black p-5 brutalist-shadow">
            <div className="font-mono text-xs text-[#c6c6c6] mb-1">Global Rank</div>
            <div className="font-space text-4xl font-bold text-[#cb2957]">#4,281</div>
            <div className="font-mono text-xs text-[#77da9f] mt-2 flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              Top 5% of Operatives Worldwide
            </div>
          </div>

          <div className="bg-[#131313] border-[3px] border-black p-5 brutalist-shadow">
            <div className="font-mono text-xs text-[#c6c6c6] mb-1">Total XP Accumulated</div>
            <div className="font-space text-4xl font-bold text-[#ffb2bd]">85,420 XP</div>
            <div className="health-bar-container mt-3">
              <div className="health-bar-fill" style={{ width: `${(xp / maxXp) * 100}%` }} />
            </div>
            <div className="font-mono text-[10px] text-[#c6c6c6] mt-1 text-right">
              {maxXp - xp} XP to Level {level + 1}
            </div>
          </div>
        </div>
      </div>

      {/* Category: Financial Discipline */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="font-space text-2xl font-bold text-white uppercase border-b-[3px] border-[#cb2957] pb-1">
            Financial Discipline
          </h2>
          <span className="px-2.5 py-1 bg-[#353535] border-[2px] border-black font-mono text-xs text-white font-bold">
            4/12
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Badge 1: Master Saver */}
          <div className="bg-[#1a1a1a] border-[3px] border-black p-6 brutalist-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-[#cb2957] border-[3px] border-black flex items-center justify-center brutalist-shadow">
                <span className="material-symbols-outlined text-3xl text-black">savings</span>
              </div>
              <span className="px-2.5 py-1 bg-[#007c4a]/30 text-[#77da9f] border-[2px] border-[#77da9f] font-mono text-[10px] font-bold">
                UNLOCKED
              </span>
            </div>
            <h3 className="font-space text-lg font-bold text-white mb-1">Master Saver</h3>
            <p className="font-inter text-xs text-[#c6c6c6] mb-4">
              Deposit 20% of income for 3 consecutive months.
            </p>
            <div className="font-mono text-[11px] mb-1 text-white flex justify-between font-bold">
              <span>Level MAX</span>
              <span>3/3</span>
            </div>
            <div className="health-bar-container">
              <div className="health-bar-fill-green" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Badge 2: Budget Vanguard */}
          <div className="bg-[#1a1a1a] border-[3px] border-black p-6 brutalist-shadow hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-[#cb2957] border-[3px] border-black flex items-center justify-center brutalist-shadow">
                <span className="material-symbols-outlined text-3xl text-black">account_balance</span>
              </div>
              <span className="px-2.5 py-1 bg-[#007c4a]/30 text-[#77da9f] border-[2px] border-[#77da9f] font-mono text-[10px] font-bold">
                UNLOCKED
              </span>
            </div>
            <h3 className="font-space text-lg font-bold text-white mb-1">Budget Vanguard</h3>
            <p className="font-inter text-xs text-[#c6c6c6] mb-4">
              Stay under monthly category budgets for 60 days.
            </p>
            <div className="font-mono text-[11px] mb-1 text-white flex justify-between font-bold">
              <span>Level MAX</span>
              <span>60/60</span>
            </div>
            <div className="health-bar-container">
              <div className="health-bar-fill-green" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Badge 3: Expense Sniper (Locked) */}
          <div className="bg-[#131313] border-[3px] border-black p-6 brutalist-shadow opacity-75 grayscale hover:grayscale-0 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="w-14 h-14 bg-[#353535] border-[3px] border-black flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl text-[#c6c6c6]">trending_down</span>
              </div>
              <span className="px-2.5 py-1 bg-[#353535] text-[#c6c6c6] border-[2px] border-black font-mono text-[10px] font-bold">
                LOCKED
              </span>
            </div>
            <h3 className="font-space text-lg font-bold text-[#c6c6c6] mb-1">Expense Sniper</h3>
            <p className="font-inter text-xs text-[#c6c6c6] mb-4">
              Reduce dining expenses by 15% vs previous month.
            </p>
            <div className="font-mono text-[11px] mb-1 text-[#c6c6c6] flex justify-between font-bold">
              <span>Level 1</span>
              <span>45%</span>
            </div>
            <div className="health-bar-container">
              <div className="health-bar-fill" style={{ width: '45%' }} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
