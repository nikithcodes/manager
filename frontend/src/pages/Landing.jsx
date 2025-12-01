import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../services/authCheck';

const Landing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(navigate);
  }, [navigate]);




  return (
    <div className="max-w-[1200px] mx-auto p-5">
      <nav className="flex justify-between items-center py-5">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-[#E8855B] rounded-full flex items-center justify-center text-white font-bold">T</div>
          <span className="text-[20px] font-bold">TaskManager</span>
        </div>
        <div>
          <button
            className="text-[#E8855B] font-medium hover:underline cursor-pointer"
            onClick={() => navigate('/auth?form=login')}
          >
            Log in
          </button>
        </div>
      </nav>

      <div className="flex flex-col md:flex-row justify-between items-center mt-[50px] gap-[40px]">
        <div className="flex-1">
          <h1 className="text-[56px] md:text-[48px] sm:text-[40px] font-black leading-tight mb-5">
            Simplify your life <br />with Task <span className="text-[#E8855B]">Manager.</span>
          </h1>
          <p className="text-[#666] text-[16px] leading-relaxed mb-[30px] max-w-[550px]">
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos dolores
            et quas molestias excepturi sint occaecati cupiditate non provident,
            similique sunt in culpa qui.
          </p>
          <div className="flex flex-col sm:flex-row gap-[20px] mb-[40px]">
            <button
              className="bg-[#B6D783] text-black px-7 py-3.5 rounded-full text-[16px] font-medium cursor-pointer"
              onClick={() => navigate('/auth?form=register')}
            >
              Sign up
            </button>
          </div>
          <div className="mt-[30px]">
            <p className="text-[16px] font-medium mb-[15px]">
              Over <span className="text-[#E8855B]">32k+</span> software businesses
            </p>
            <div className="flex gap-[30px] items-center text-[#aaa] text-sm">
              <span>Trusted Worldwide</span>
              <span>99.9% Uptime</span>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-center relative">
          <div className="relative w-full h-[300px] bg-[#f5f5f5] rounded-xl flex items-center justify-center text-[#ccc]">
            
            <img src='/home.png'/>
            <div className="absolute top-0 -right-10 w-[80px] h-[80px] bg-[url('./assets/decoration.svg')] bg-contain bg-no-repeat z-0"></div>
          </div>
        </div>
      </div>

      
      <div className="mt-[100px]">
        <h2 className="text-[32px] font-bold mb-10 text-center">What our users say</h2>
        <div className="grid md:grid-cols-3 gap-[30px]">
          {[
            {
              name: "Amit Sharma",
              quote:
                "TaskManager changed how I manage my team’s daily tasks. Super clean UI and blazing fast.",
            },
            {
              name: "Priya Verma",
              quote:
                "Absolutely love the simplicity and efficiency. I recommend it to everyone.",
            },
            {
              name: "Rohit Khanna",
              quote:
                "From messy to organized in a few clicks. Couldn’t ask for more.",
            },
          ].map((t, idx) => (
            <div key={idx} className="bg-white shadow p-6 rounded-xl border">
              <p className="text-[#333] italic mb-4">“{t.quote}”</p>
              <p className="text-[#E8855B] font-semibold">{t.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-[100px] py-[40px] border-t text-center text-[#888] text-sm">
        © {new Date().getFullYear()} TaskManager. All rights reserved.
      </footer>
    </div>
  );
};

export default Landing;
