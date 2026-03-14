import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Train, Zap, ShieldCheck, WifiOff, CheckCircle2, 
  CreditCard, SmartphoneNfc, Wallet, Landmark, QrCode, 
  ChevronRight, MapPin, Receipt, Check, Loader2, Info, X
} from 'lucide-react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  const nextScreen = () => setCurrentScreen((prev) => Math.min(prev + 1, 10));
  const prevScreen = () => setCurrentScreen((prev) => Math.max(prev - 1, 1));
  const reset = () => setCurrentScreen(1);

  // Live URL for Delhi Metro Logo to ensure it loads in the preview sandbox
  const dmrcLogoUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Delhi_Metro_logo.svg/500px-Delhi_Metro_logo.svg.png";

  // Top Navigation Bar with Fixed Logos
  const Header = ({ title, showBack = true, onClose = false, dark = false }) => (
    <div className="flex items-center p-4 bg-transparent z-10 relative">
      {showBack && (
        <button onClick={prevScreen} className={`p-2 -ml-2 rounded-full transition-colors ${dark ? 'hover:bg-white/10' : 'hover:bg-gray-100'}`}>
          <ArrowLeft className={`w-6 h-6 ${dark ? 'text-white' : 'text-slate-800'}`} />
        </button>
      )}
      {onClose && (
        <button onClick={nextScreen} className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors">
          <X className={`w-6 h-6 ${dark ? 'text-white' : 'text-slate-800'}`} />
        </button>
      )}
      <h1 className={`text-lg font-medium ml-2 ${dark ? 'text-white' : 'text-slate-800'}`}>{title}</h1>
      <div className="flex-1" />
      
      {/* Universal Branding Logos */}
      <div className="flex items-center gap-1.5">
        {/* PRAVAH Logo (CSS/SVG to guarantee it renders perfectly) */}
        <div className="flex items-center gap-1.5 px-2 py-1 bg-white rounded shadow-sm border border-gray-100 h-8">
          <div className="w-4 h-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3px] flex items-center justify-center">
            <span className="text-white text-[10px] font-bold italic leading-none">P</span>
          </div>
          <span className="text-[10px] font-bold tracking-widest text-slate-800">PRAVAH</span>
        </div>
        
        {/* Delhi Metro Logo (Public Web URL) */}
        <div className="bg-white px-1.5 py-1 rounded shadow-sm border border-gray-100 h-8 w-12 flex items-center justify-center">
          <img 
            src={dmrcLogoUrl} 
            alt="DMRC" 
            className="h-full w-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              // Fallback red circle if network blocks wikimedia
              e.target.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='40' stroke='red' stroke-width='10' fill='none'/></svg>";
            }}
          />
        </div>
      </div>
    </div>
  );

  // Screen 1: Activate Transit Mode
  const Screen1 = () => (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <Header title="" />
      <div className="flex-1 px-6 pb-24 overflow-y-auto">
        <div className="w-full h-48 bg-blue-50 rounded-3xl flex items-center justify-center mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50" />
          <Train className="w-24 h-24 text-blue-500 relative z-10" strokeWidth={1.5} />
        </div>
        
        <h2 className="text-3xl font-semibold text-slate-900 tracking-tight mb-3">
          Breeze through metro gates.
        </h2>
        <p className="text-slate-500 text-lg mb-8 leading-relaxed">
          No more queues. No more tickets. Just tap your phone and ride with P.R.A.V.A.H.
        </p>

        <div className="space-y-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Instant gate entry</h3>
              <p className="text-slate-500 text-sm">Zero wait time. Open gates in &lt;200ms.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-full">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Pay later at the end of the day</h3>
              <p className="text-slate-500 text-sm">Rides are grouped. One single payment.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
              <WifiOff className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">Works with low network</h3>
              <p className="text-slate-500 text-sm">Tap and go even if you lose signal underground.</p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
        <button onClick={nextScreen} className="w-full bg-blue-600 text-white font-medium text-lg py-4 rounded-full shadow-lg hover:bg-blue-700 active:scale-95 transition-all">
          Enable Transit Mode
        </button>
      </div>
    </div>
  );

  // Screen 2: Choose Payment Method
  const Screen2 = () => {
    const [selected, setSelected] = useState('credit');
    return (
      <div className="flex flex-col h-full bg-[#f8f9fa]">
        <Header title="Setup Payments" />
        <div className="flex-1 px-4 pb-24 overflow-y-auto">
          <h2 className="text-2xl font-semibold text-slate-900 mb-2 px-2">How would you like to pay?</h2>
          <p className="text-slate-500 text-sm mb-6 px-2">Set a primary method to guarantee gate entry.</p>

          <div className="space-y-3">
            <div 
              onClick={() => setSelected('credit')}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer bg-white ${selected === 'credit' ? 'border-blue-500 shadow-md bg-blue-50/30' : 'border-transparent shadow-sm hover:border-gray-200'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${selected === 'credit' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">UPI Credit Line</h3>
                    <p className="text-slate-500 text-sm">Pay for all daily rides at once</p>
                  </div>
                </div>
                {selected === 'credit' && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
              </div>
              <div className="mt-3 inline-block px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-md">
                RECOMMENDED
              </div>
            </div>

            <div 
              onClick={() => setSelected('autopay')}
              className={`p-4 rounded-3xl border-2 transition-all cursor-pointer bg-white ${selected === 'autopay' ? 'border-blue-500 shadow-md bg-blue-50/30' : 'border-transparent shadow-sm hover:border-gray-200'}`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${selected === 'autopay' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                    <SmartphoneNfc className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">UPI AutoPay</h3>
                    <p className="text-slate-500 text-sm">Automatic bank deductions</p>
                  </div>
                </div>
                {selected === 'autopay' && <CheckCircle2 className="w-6 h-6 text-blue-600" />}
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-white shadow-sm border border-transparent opacity-60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-100 text-gray-500">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">UPI Lite</h3>
                  <p className="text-slate-500 text-sm">₹450 available</p>
                </div>
              </div>
            </div>
            
            <div className="p-4 rounded-3xl bg-white shadow-sm border border-transparent opacity-60">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-gray-100 text-gray-500">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Bank Account Connect</h3>
                  <p className="text-slate-500 text-sm">HDFC Bank •••• 1234</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 px-2">
            <h3 className="text-sm font-semibold text-slate-700 mb-2">Fallback Method</h3>
            <div className="bg-white p-4 rounded-2xl shadow-sm flex items-center justify-between border border-gray-100">
              <div className="flex items-center gap-2">
                <SmartphoneNfc className="w-4 h-4 text-gray-400" />
                <span className="text-slate-700">UPI AutoPay</span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>

        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100">
          <button onClick={nextScreen} className="w-full bg-blue-600 text-white font-medium text-lg py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
            Continue
          </button>
        </div>
      </div>
    );
  };

  // Screen 3: Activate Credit Line
  const Screen3 = () => {
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(2000);
    const [agreed, setAgreed] = useState(false);

    useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 1500);
      return () => clearTimeout(timer);
    }, []);

    return (
      <div className="flex flex-col h-full bg-[#f8f9fa]">
        <Header title="Transit Credit Line" />
        <div className="flex-1 px-6 pb-24 overflow-y-auto">
          
          <div className="flex flex-col items-center justify-center py-8">
            {loading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Checking eligibility...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-500">
                  <Check className="w-8 h-8" strokeWidth={3} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Eligibility Confirmed!</h2>
              </div>
            )}
          </div>

          {!loading && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 mb-6">
                <p className="text-slate-500 text-sm font-medium mb-1">Pre-approved Transit Limit</p>
                <div className="text-4xl font-bold text-slate-900 mb-6">₹{limit.toLocaleString()} <span className="text-lg text-gray-400 font-normal">/ mo</span></div>
                
                <input 
                  type="range" 
                  min="500" 
                  max="5000" 
                  step="100" 
                  value={limit} 
                  onChange={(e) => setLimit(e.target.value)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-2 font-medium">
                  <span>₹500</span>
                  <span>₹5,000</span>
                </div>
              </div>

              <div className="bg-slate-100 p-4 rounded-2xl flex gap-3 mb-6">
                <Info className="w-5 h-5 text-slate-500 shrink-0" />
                <p className="text-sm text-slate-600">
                  Rides are grouped and billed at the end of the day. <strong>No interest</strong> if paid automatically.
                </p>
              </div>

              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`mt-0.5 w-6 h-6 rounded flex items-center justify-center border-2 transition-colors ${agreed ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}`}>
                  {agreed && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
                <input type="checkbox" className="hidden" checked={agreed} onChange={() => setAgreed(!agreed)} />
                <span className="text-sm text-slate-600">I agree to the Terms and Conditions and authorize the background settlement.</span>
              </label>
            </div>
          )}

        </div>
        {!loading && (
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 animate-in fade-in duration-500">
            <button 
              onClick={nextScreen} 
              disabled={!agreed}
              className={`w-full font-medium text-lg py-4 rounded-full shadow-lg transition-all ${agreed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            >
              Activate & Link
            </button>
          </div>
        )}
      </div>
    );
  };

  // Screen 4: Transit Mode Activated (Success)
  const Screen4 = () => (
    <div className="flex flex-col h-full bg-[#f8f9fa] justify-center relative">
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-green-200 animate-bounce">
          <Check className="w-12 h-12 text-white" strokeWidth={3} />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-2">You're ready to ride!</h2>
        <p className="text-slate-500 text-center mb-10 text-lg">
          Transit mode is now active.
        </p>

        <div className="w-full bg-white rounded-3xl p-5 shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="text-slate-500 text-sm">Primary Payment</span>
            <span className="font-semibold text-slate-900 flex items-center gap-1">
              <CreditCard className="w-4 h-4 text-blue-500"/> UPI Credit Line
            </span>
          </div>
          <div className="flex justify-between items-center pb-4 border-b border-gray-100">
            <span className="text-slate-500 text-sm">Backup Payment</span>
            <span className="font-semibold text-slate-900 flex items-center gap-1">
              <SmartphoneNfc className="w-4 h-4 text-gray-500"/> UPI AutoPay
            </span>
          </div>
          <p className="text-sm text-center text-slate-600 pt-2 font-medium">
            Just hold your phone near the metro gate scanner. You don't even need to open the app!
          </p>
        </div>
      </div>
      <div className="p-4">
        <button onClick={nextScreen} className="w-full bg-blue-600 text-white font-medium text-lg py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          Go to Transit Hub
        </button>
      </div>
    </div>
  );

  // Screen 5: Ready to Ride (Transit Home)
  const Screen5 = () => (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <div className="flex items-center justify-between p-4 bg-white shadow-sm z-10">
        <div className="flex items-center gap-2">
          <div className="bg-slate-100 p-2 rounded-full">
            <MapPin className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900">Delhi Metro</h1>
            <p className="text-xs text-green-600 font-semibold">• Ready to Board</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-500 font-medium">Available Limit</p>
          <p className="font-bold text-slate-900">₹1,950</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">
        {/* Decorative background circles */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
          <div className="w-[400px] h-[400px] border border-blue-100 rounded-full absolute" />
          <div className="w-[300px] h-[300px] border border-blue-200 rounded-full absolute" />
          <div className="w-[200px] h-[200px] bg-blue-50 rounded-full absolute" />
        </div>

        {/* The Action Button */}
        <button 
          onClick={nextScreen}
          className="relative z-10 w-64 h-64 bg-slate-900 rounded-full shadow-2xl flex flex-col items-center justify-center gap-4 hover:scale-105 active:scale-95 transition-all group"
        >
          <div className="absolute inset-0 rounded-full border-4 border-slate-800 border-t-blue-500 animate-spin opacity-50"></div>
          <div className="bg-slate-800 p-4 rounded-full group-hover:bg-slate-700 transition-colors">
            <SmartphoneNfc className="w-12 h-12 text-white" />
          </div>
          <span className="text-white font-bold text-xl tracking-wide">Tap to Ride</span>
          <div className="flex items-center gap-2 text-slate-400 text-sm">
            <QrCode className="w-4 h-4" /> Or Scan QR
          </div>
        </button>
      </div>

      <div className="bg-white rounded-t-3xl p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] border-t border-gray-100 z-10">
        <h3 className="text-sm font-semibold text-slate-500 mb-4">RECENT ACTIVITY</h3>
        <div className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <Check className="w-5 h-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900">Yesterday's Settlement</p>
              <p className="text-xs text-slate-500">Paid via UPI Credit Line</p>
            </div>
          </div>
          <span className="font-bold text-slate-900">₹65</span>
        </div>
        <button className="w-full mt-4 text-blue-600 font-medium text-sm py-2">
          View Past Trips
        </button>
      </div>
    </div>
  );

  // Screen 6: Gate Entry Screen
  const Screen6 = () => (
    <div className="flex flex-col h-full bg-white relative">
      <Header title="Initiate Ride" showBack={false} onClose={true} />
      
      <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-20">
        <p className="text-slate-600 font-medium text-lg mb-8 text-center">
          Hold near the scanner<br/>or scan QR
        </p>

        {/* Dynamic Proper QR */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 relative mb-12 w-64 h-64 flex flex-col items-center justify-center">
          
          <div className="relative w-48 h-48 bg-white flex items-center justify-center">
             {/* QR Position Squares */}
             <div className="absolute top-0 left-0 w-12 h-12 border-[5px] border-slate-900 flex items-center justify-center rounded-sm"><div className="w-5 h-5 bg-slate-900 rounded-sm"></div></div>
             <div className="absolute top-0 right-0 w-12 h-12 border-[5px] border-slate-900 flex items-center justify-center rounded-sm"><div className="w-5 h-5 bg-slate-900 rounded-sm"></div></div>
             <div className="absolute bottom-0 left-0 w-12 h-12 border-[5px] border-slate-900 flex items-center justify-center rounded-sm"><div className="w-5 h-5 bg-slate-900 rounded-sm"></div></div>
             
             {/* QR Data Pattern (Deterministic) */}
             <div className="w-full h-full pt-[2px] pl-[2px] grid grid-cols-12 grid-rows-12 gap-[3px] opacity-90">
               {Array.from({ length: 144 }).map((_, i) => {
                 // Skip drawing where position squares or center logo are
                 const isTopLeft = i % 12 < 4 && Math.floor(i / 12) < 4;
                 const isTopRight = i % 12 > 7 && Math.floor(i / 12) < 4;
                 const isBottomLeft = i % 12 < 4 && Math.floor(i / 12) > 7;
                 const isCenter = i % 12 > 3 && i % 12 < 8 && Math.floor(i / 12) > 3 && Math.floor(i / 12) < 8;
                 
                 if (isTopLeft || isTopRight || isBottomLeft || isCenter) return <div key={i} className="opacity-0"></div>;
                 
                 const isVisible = (i * 7 + 13) % 5 > 1;
                 return <div key={i} className={`bg-slate-900 rounded-[1px] ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>;
               })}
             </div>

            {/* DMRC Logo Badge in Center */}
            <div className="absolute w-14 h-14 bg-white rounded-xl shadow-lg border-2 border-white flex items-center justify-center p-1.5">
               <img src={dmrcLogoUrl} alt="DMRC Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          
          {/* Progress bar for refresh */}
          <div className="absolute -bottom-6 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-full animate-[shrink_30s_linear_infinite]" style={{ transformOrigin: 'left' }}></div>
          </div>
        </div>

        {/* NFC Ripple Indicator */}
        <div className="relative flex items-center justify-center w-full h-32 cursor-pointer" onClick={nextScreen}>
          <div className="absolute w-16 h-16 bg-blue-100 rounded-full animate-ping opacity-75"></div>
          <div className="absolute w-24 h-24 border-2 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute w-32 h-32 border border-blue-100 rounded-full animate-pulse delay-75"></div>
          <div className="relative bg-white p-4 rounded-full shadow-lg border border-blue-50">
            <SmartphoneNfc className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <p className="text-blue-600 font-semibold text-sm mt-4 tracking-wider uppercase">Broadcasting NFC...</p>

      </div>
      
      <div className="absolute bottom-6 left-6 right-6 text-center">
        <p className="text-xs text-slate-400 font-medium mb-4 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Secured via UPI Credit Line
        </p>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />
    </div>
  );

  // Screen 7: Ride in Progress
  const Screen7 = () => (
    <div className="flex flex-col h-full bg-slate-900 relative overflow-hidden">
      <Header title="" showBack={false} dark={true} />
      
      {/* Background animated ambiance */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-blue-500 rounded-full blur-3xl -top-32 -left-32 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500 rounded-full blur-3xl -bottom-32 -right-32 animate-pulse delay-1000"></div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative z-10">
        
        {/* Boarding Station Badge */}
        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 mb-12 flex items-center gap-3 shadow-xl">
           <Train className="w-5 h-5 text-blue-300" />
           <span className="text-white font-medium tracking-wide">Journey Started At: Rajiv Chowk</span>
        </div>

        {/* Pravaah Central Animation */}
        <div className="relative flex items-center justify-center mb-16">
          <div className="absolute w-48 h-48 border-[2px] border-blue-500/20 rounded-full animate-[spin_4s_linear_infinite]">
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <div className="absolute w-36 h-36 border border-blue-400/40 rounded-full animate-[spin_3s_linear_infinite_reverse]">
             <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-indigo-400 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-600 to-indigo-800 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.6)] p-3 overflow-hidden">
            <Zap className="w-8 h-8 text-white mb-0.5" />
            <span className="text-white font-bold text-[10px] tracking-[0.2em]">PRAVAH</span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Ride in Progress</h2>
        <p className="text-blue-200/80 text-center font-medium max-w-[260px] text-sm leading-relaxed">
          Enjoy your journey. Your final fare will be calculated automatically when you exit.
        </p>

      </div>

      <div className="p-6 relative z-10">
        <button onClick={nextScreen} className="w-full bg-white/10 hover:bg-white/20 text-white font-medium text-lg py-4 rounded-full backdrop-blur-md border border-white/20 shadow-lg transition-all">
          Simulate Exit
        </button>
      </div>
    </div>
  );

  // Screen 8: Gate Exit Screen
  const Screen8 = () => (
    <div className="flex flex-col h-full bg-white relative">
      <Header title="Scan to Exit" showBack={false} onClose={true} />
      
      <div className="flex-1 flex flex-col items-center px-6 pt-10 pb-20">
        <p className="text-slate-600 font-medium text-lg mb-8 text-center">
          Hold near the scanner<br/>or scan QR to complete ride
        </p>

        {/* Dynamic Proper QR */}
        <div className="bg-white p-4 rounded-3xl shadow-xl border border-gray-100 relative mb-12 w-64 h-64 flex flex-col items-center justify-center">
          
          <div className="relative w-48 h-48 bg-white flex items-center justify-center">
             {/* QR Position Squares */}
             <div className="absolute top-0 left-0 w-12 h-12 border-[5px] border-slate-900 flex items-center justify-center rounded-sm"><div className="w-5 h-5 bg-slate-900 rounded-sm"></div></div>
             <div className="absolute top-0 right-0 w-12 h-12 border-[5px] border-slate-900 flex items-center justify-center rounded-sm"><div className="w-5 h-5 bg-slate-900 rounded-sm"></div></div>
             <div className="absolute bottom-0 left-0 w-12 h-12 border-[5px] border-slate-900 flex items-center justify-center rounded-sm"><div className="w-5 h-5 bg-slate-900 rounded-sm"></div></div>
             
             {/* QR Data Pattern (Deterministic) */}
             <div className="w-full h-full pt-[2px] pl-[2px] grid grid-cols-12 grid-rows-12 gap-[3px] opacity-90">
               {Array.from({ length: 144 }).map((_, i) => {
                 // Skip drawing where position squares or center logo are
                 const isTopLeft = i % 12 < 4 && Math.floor(i / 12) < 4;
                 const isTopRight = i % 12 > 7 && Math.floor(i / 12) < 4;
                 const isBottomLeft = i % 12 < 4 && Math.floor(i / 12) > 7;
                 const isCenter = i % 12 > 3 && i % 12 < 8 && Math.floor(i / 12) > 3 && Math.floor(i / 12) < 8;
                 
                 if (isTopLeft || isTopRight || isBottomLeft || isCenter) return <div key={i} className="opacity-0"></div>;
                 
                 const isVisible = (i * 7 + 13) % 5 > 1;
                 return <div key={i} className={`bg-slate-900 rounded-[1px] ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>;
               })}
             </div>

            {/* Actual DMRC Logo Badge in Center */}
            <div className="absolute w-14 h-14 bg-white rounded-xl shadow-lg border-2 border-white flex items-center justify-center p-1.5">
               <img src={dmrcLogoUrl} alt="DMRC Logo" className="w-full h-full object-contain" />
            </div>
          </div>
          
          {/* Progress bar for refresh */}
          <div className="absolute -bottom-6 w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 w-full animate-[shrink_30s_linear_infinite]" style={{ transformOrigin: 'left' }}></div>
          </div>
        </div>

        {/* NFC Ripple Indicator */}
        <div className="relative flex items-center justify-center w-full h-32 cursor-pointer" onClick={nextScreen}>
          <div className="absolute w-16 h-16 bg-blue-100 rounded-full animate-ping opacity-75"></div>
          <div className="absolute w-24 h-24 border-2 border-blue-200 rounded-full animate-pulse"></div>
          <div className="absolute w-32 h-32 border border-blue-100 rounded-full animate-pulse delay-75"></div>
          <div className="relative bg-white p-4 rounded-full shadow-lg border border-blue-50">
            <SmartphoneNfc className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <p className="text-blue-600 font-semibold text-sm mt-4 tracking-wider uppercase">Broadcasting NFC...</p>

      </div>
      
      <div className="absolute bottom-6 left-6 right-6 text-center">
        <p className="text-xs text-slate-400 font-medium mb-4 flex items-center justify-center gap-1">
          <ShieldCheck className="w-4 h-4" /> Secured via UPI Credit Line
        </p>
      </div>
    </div>
  );

  // Screen 9: Ride Summary
  const Screen9 = () => (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <Header title="" showBack={false} />
      <div className="flex-1 px-6 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
          <Receipt className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-8">Trip Complete</h2>

        {/* Receipt Card */}
        <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden mb-6 relative">
          {/* Ticket cutouts */}
          <div className="absolute top-[88px] -left-3 w-6 h-6 bg-[#f8f9fa] rounded-full border-r border-gray-200"></div>
          <div className="absolute top-[88px] -right-3 w-6 h-6 bg-[#f8f9fa] rounded-full border-l border-gray-200"></div>

          <div className="p-6 border-b-2 border-dashed border-gray-200">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Entry</p>
                <p className="font-bold text-slate-900 text-lg">Rajiv Chowk</p>
                <p className="text-sm text-slate-500">09:15 AM</p>
              </div>
              <div className="flex flex-col justify-center items-center px-4 mt-4">
                <div className="h-0.5 w-12 bg-gray-300 relative">
                  <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-gray-300 bg-white"></div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mb-1">Exit</p>
                <p className="font-bold text-slate-900 text-lg">Guru Dronacharya</p>
                <p className="text-sm text-slate-500">09:42 AM</p>
              </div>
            </div>
          </div>
          <div className="p-6 bg-slate-50 flex justify-between items-center">
            <span className="font-semibold text-slate-600">Calculated Fare</span>
            <span className="text-2xl font-bold text-slate-900">₹40</span>
          </div>
        </div>

        {/* Pending Banner */}
        <div className="w-full bg-yellow-50 border border-yellow-200 p-4 rounded-xl flex gap-3">
          <Loader2 className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
          <p className="text-sm text-yellow-800 font-medium">
            Payment Pending. This will be settled at the end of the day along with your other rides.
          </p>
        </div>

      </div>
      <div className="p-4">
        <button onClick={nextScreen} className="w-full bg-blue-600 text-white font-medium text-lg py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          Done
        </button>
      </div>
    </div>
  );

  // Screen 10: End of Day Settlement
  const Screen10 = () => (
    <div className="flex flex-col h-full bg-[#f8f9fa]">
      <Header title="Daily Transit Settlement" showBack={false} />
      <div className="flex-1 px-4 overflow-y-auto pb-24">
        
        <div className="text-center mb-8 mt-4">
          <p className="text-slate-500 font-medium mb-2">Today's Metro Trips • Oct 24</p>
          <h2 className="text-5xl font-bold text-slate-900 mb-4">₹65</h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
            <CheckCircle2 className="w-4 h-4" /> Paid Successfully
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Trip Breakdown</h3>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 mb-6 space-y-4">
          <div className="flex justify-between items-center pb-4 border-b border-gray-50">
            <div>
              <p className="font-semibold text-slate-900">Rajiv Chowk → Guru Dronacharya</p>
              <p className="text-xs text-slate-500">09:15 AM - 09:42 AM</p>
            </div>
            <span className="font-semibold text-slate-900">₹40</span>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold text-slate-900">Guru Dronacharya → Hauz Khas</p>
              <p className="text-xs text-slate-500">06:30 PM - 07:15 PM</p>
            </div>
            <span className="font-semibold text-slate-900">₹25</span>
          </div>
        </div>

        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">Payment Source</h3>
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
              <CreditCard className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-slate-900">UPI Credit Line</p>
              <p className="text-xs text-slate-500">Limit remaining: ₹1,885</p>
            </div>
            <span className="font-bold text-slate-900">₹65</span>
          </div>
        </div>

      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex gap-3">
         <button onClick={reset} className="flex-1 bg-slate-100 text-slate-800 font-medium text-lg py-4 rounded-full hover:bg-slate-200 transition-all">
          Restart
        </button>
        <button onClick={reset} className="flex-[2] bg-blue-600 text-white font-medium text-lg py-4 rounded-full shadow-lg hover:bg-blue-700 transition-all">
          View Statement
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 flex items-center justify-center p-4 font-sans antialiased">
      {/* Phone Mockup Container */}
      <div className="w-full max-w-[400px] h-[850px] max-h-screen bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-[12px] border-slate-900">
        
        {/* Notch simulation */}
        <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-50 pointer-events-none">
          <div className="w-40 h-6 bg-slate-900 rounded-b-3xl"></div>
        </div>

        {/* Screen content */}
        <div className="w-full h-full relative pt-6 bg-[#f8f9fa]">
          {currentScreen === 1 && <Screen1 />}
          {currentScreen === 2 && <Screen2 />}
          {currentScreen === 3 && <Screen3 />}
          {currentScreen === 4 && <Screen4 />}
          {currentScreen === 5 && <Screen5 />}
          {currentScreen === 6 && <Screen6 />}
          {currentScreen === 7 && <Screen7 />}
          {currentScreen === 8 && <Screen8 />}
          {currentScreen === 9 && <Screen9 />}
          {currentScreen === 10 && <Screen10 />}
        </div>
        
        {/* Debug / Nav controls purely for the prototype previewer */}
        <div className="absolute top-2 left-2 z-50 flex gap-1 bg-white/80 p-1 rounded-full text-xs shadow-sm">
           <span className="px-2 font-mono text-slate-400">{currentScreen}/10</span>
        </div>
      </div>
    </div>
  );
}