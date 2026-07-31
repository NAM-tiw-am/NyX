'use client';

import { useAppStore } from '@/store/useAppStore';
import AvatarIcon from '@/components/ui/AvatarIcon';

export default function ProfilePage() {
  const { agentName, level, xp, maxXp, selectedCharacter, isSidebarCollapsed } = useAppStore();

  return (
    <main className={`pt-20 lg:pt-8 pb-24 lg:pb-8 p-4 sm:p-8 max-w-7xl mx-auto min-h-screen transition-all duration-300 ${
      isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
    }`}>
      {/* Header with Avatar & Level */}
      <header className="mb-8 border-b-[3px] border-black pb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-space text-3xl sm:text-5xl font-bold text-white uppercase tracking-tighter mb-2">
            Operative Profile
          </h1>
          <p className="font-mono text-xs text-[#c6c6c6]">Your finance profile and progress summary</p>
        </div>

        {/* Avatar + Level Badge */}
        <div className="flex items-center gap-3 bg-[#1a1a1a] border-[3px] border-black p-3 brutalist-shadow">
          <AvatarIcon character={selectedCharacter} size="md" />
          <div>
            <div className="font-space font-bold text-white text-base uppercase">{agentName}</div>
            <div className="font-mono text-xs text-[#cb2957] font-bold">{selectedCharacter.classTitle} {'//'} LVL {level}</div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[#1a1a1a] border-[3px] border-black p-6 brutalist-shadow mb-8 flex flex-col md:flex-row gap-6 items-center">
        <div className="shrink-0 relative">
          <AvatarIcon character={selectedCharacter} size="xl" />
          <div className="absolute bottom-0 right-0 bg-[#cb2957] text-black font-mono text-[10px] font-bold px-1.5 py-0.5 border-t-[2px] border-l-[2px] border-black">
            LVL {level}
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
            <h2 className="font-space text-2xl font-bold text-white uppercase">{agentName}</h2>
            <span className="font-mono text-xs font-bold uppercase bg-[#cb2957] text-black px-3 py-1 border-[2px] border-black">
              {selectedCharacter.classTitle}
            </span>
          </div>

          <p className="font-mono text-xs text-[#c6c6c6] mb-4">
            Focus: savings consistency, budget tracking, and goal progress.
          </p>

          <div>
            <div className="flex justify-between font-mono text-xs mb-1">
              <span className="text-white font-bold">XP PROGRESSION</span>
              <span className="text-[#ffb2bd] font-bold">{xp} / {maxXp} XP</span>
            </div>
            <div className="health-bar-container">
              <div className="health-bar-fill" style={{ width: `${(xp / maxXp) * 100}%` }} />
            </div>
          </div>
        </div>
      </section>

      {/* RPG Combat Stats & Active Gear */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
        {/* Attributes (6 cols) */}
        <section className="lg:col-span-6 bg-[#131313] border-[3px] border-black p-6 brutalist-shadow">
          <h3 className="font-space text-xl font-bold text-white uppercase border-b-[3px] border-black pb-2 mb-6">
            RPG Attributes
          </h3>

          <div className="space-y-5">
            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#ffb2bd] font-bold">STR — Savings Rate</span>
                <span className="text-white font-bold">{selectedCharacter.str}%</span>
              </div>
              <div className="health-bar-container">
                <div className="health-bar-fill" style={{ width: `${selectedCharacter.str}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#77da9f] font-bold">WIS — Budget Adherence</span>
                <span className="text-white font-bold">{selectedCharacter.wis}/100</span>
              </div>
              <div className="health-bar-container">
                <div className="health-bar-fill-green" style={{ width: `${selectedCharacter.wis}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#ffb2bd] font-bold">DEX — Liquidity Ratio</span>
                <span className="text-white font-bold">{selectedCharacter.dex}%</span>
              </div>
              <div className="health-bar-container">
                <div className="health-bar-fill" style={{ width: `${selectedCharacter.dex}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-mono text-xs mb-1">
                <span className="text-[#77da9f] font-bold">CON — Debt-to-Income</span>
                <span className="text-white font-bold">{selectedCharacter.con}%</span>
              </div>
              <div className="health-bar-container">
                <div className="health-bar-fill-green" style={{ width: `${selectedCharacter.con}%` }} />
              </div>
            </div>
          </div>
        </section>

        {/* Active Gear (6 cols) */}
        <section className="lg:col-span-6 bg-[#131313] border-[3px] border-black p-6 brutalist-shadow">
          <h3 className="font-space text-xl font-bold text-white uppercase border-b-[3px] border-black pb-2 mb-6">
            Linked Tools
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-[#1a1a1a] border-[3px] border-black p-4 brutalist-shadow text-center">
              <span className="material-symbols-outlined text-3xl text-[#cb2957] mb-2">credit_card</span>
              <div className="font-space font-bold text-white text-sm uppercase">Obsidian Card</div>
              <div className="font-mono text-[10px] text-[#77da9f] mt-1">+3% Cashback Buff</div>
            </div>

            <div className="bg-[#1a1a1a] border-[3px] border-black p-4 brutalist-shadow text-center">
              <span className="material-symbols-outlined text-3xl text-[#77da9f] mb-2">vault</span>
              <div className="font-space font-bold text-white text-sm uppercase">Savings Account</div>
              <div className="font-mono text-[10px] text-[#77da9f] mt-1">Goal funding source</div>
            </div>

            <div className="bg-[#131313] border-[3px] border-dashed border-[#353535] p-4 text-center opacity-60">
              <span className="material-symbols-outlined text-3xl text-[#c6c6c6] mb-2">lock</span>
              <div className="font-space font-bold text-[#c6c6c6] text-sm uppercase">Locked Slot</div>
              <div className="font-mono text-[10px] text-[#c6c6c6] mt-1">Unlocks at Level 50</div>
            </div>
          </div>
        </section>
      </div>

      {/* Career Milestone Timeline */}
      <section className="bg-[#131313] border-[3px] border-black p-6 brutalist-shadow">
        <h3 className="font-space text-xl font-bold text-white uppercase border-b-[3px] border-black pb-2 mb-6">
          Career Timeline
        </h3>

        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-[#1a1a1a] border-[2px] border-black flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#cb2957]">military_tech</span>
              <div>
                <div className="font-bold text-white text-sm">LEVEL 42 REACHED</div>
                <div className="text-[#c6c6c6]">Reached a new profile level through consistent tracking</div>
              </div>
            </div>
            <span className="text-[#77da9f] font-bold">2 DAYS AGO</span>
          </div>

          <div className="p-4 bg-[#1a1a1a] border-[2px] border-black flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[#77da9f]">emoji_events</span>
              <div>
                <div className="font-bold text-white text-sm">DEBT DESTROYER BADGE UNLOCKED</div>
                <div className="text-[#c6c6c6]">Maintained zero credit balance for 30 consecutive cycles</div>
              </div>
            </div>
            <span className="text-[#c6c6c6]">14 DAYS AGO</span>
          </div>
        </div>
      </section>
    </main>
  );
}
