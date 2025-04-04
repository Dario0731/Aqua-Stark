"use client";

// import type React from "react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Trophy, Target, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBubbles } from "@/hooks/useBubbles";
import { BubblesBackground } from "@/components/bubble-background";
import { cn } from "@/lib/utils";
import { LoginRewards } from "@/components/achievements/login-rewards";
import { Achievements } from "@/components/achievements/achievements";
import { Missions } from "@/components/achievements/missions";
import { Milestones } from "@/components/achievements/milestones";
import { mockLoginRewards, mockGameMilestones } from "@/data/mock-data";

const TABS = [
  { id: "achievements", name: "Achievements", icon: Trophy },
  { id: "missions", name: "Missions", icon: Target },
  { id: "login_rewards", name: "Login Rewards", icon: Calendar },
  { id: "milestones", name: "Milestones", icon: Star },
];

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState("achievements");

  const bubbles = useBubbles();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-500 to-blue-700 animated-background">
      <nav className="relative z-10 p-4 bg-blue-700 border-b-2 border-blue-400/50">
        <div className="flex items-center justify-between mx-auto font-sans max-w-7xl">
          <Link to="/" className="flex items-center">
            <Button
              variant="ghost"
              className="mr-2 text-xs text-white rounded-full hover:bg-blue-500/50"
            >
              <ArrowLeft className="mr-2" width={14} />
              Back to Game
            </Button>
            <h3 className="text-lg font-semibold text-white">
              Achievements & Rewards
            </h3>
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex items-center px-4 py-2 border rounded-full bg-blue-700/50 border-blue-400/50">
              <Trophy className="mr-2 text-yellow-400" size={20} />
              <span className="font-bold text-white">2/8</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative z-20 flex flex-col items-center px-4 py-8 mx-auto max-w-7xl">
        <div className="w-full">
          <div className="flex items-center justify-between gap-1 p-1 bg-blue-700 rounded-lg">
            {TABS.map(({ id, name, icon }, i) => (
              <TabButton
                key={i}
                active={activeTab === id}
                onClick={() => setActiveTab(id)}
              >
                {React.createElement(icon, { size: 14 })}
                {name}
              </TabButton>
            ))}
          </div>

          {activeTab === "achievements" && <Achievements />}
          {activeTab === "missions" && <Missions />}
          {activeTab === "login_rewards" && (
            <LoginRewards data={mockLoginRewards} />
          )}
          {activeTab === "milestones" && (
            <Milestones data={mockGameMilestones} />
          )}
        </div>
      </main>

      <footer className="relative bottom-0 z-10 w-full py-6 bg-blue-800 border-t-2 border-blue-400/50">
        <div className="container px-4 mx-auto text-center">
          <p className="mb-2 text-white/80">
            © 2025 Aqua Stark - All rights reserved
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Link
              to="#"
              className="text-white transition-colors hover:text-blue-200"
            >
              Polity and Privacy
            </Link>
            <Link
              to="#"
              className="text-white transition-colors hover:text-blue-200"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-white transition-colors hover:text-blue-200"
            >
              Contact
            </Link>
          </div>
          <BubblesBackground
            bubbles={bubbles}
            animationName="footer-float-up"
          />
        </div>
      </footer>
    </div>
  );
}

function TabButton({
  children,
  active,
  onClick,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "py-1 flex-1 px-4 text-xs md:text-sm font-normal rounded-lg transition-all duration-200 flex items-center justify-center gap-1",
        active
          ? "bg-blue-600 text-white"
          : "bg-blue-700 text-blue-100 hover:bg-blue-600/70"
      )}
    >
      {children}
    </button>
  );
}
