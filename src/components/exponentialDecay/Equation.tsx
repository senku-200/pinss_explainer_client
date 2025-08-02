import katex from "katex";
import "katex/dist/katex.min.css";
import { useEffect, useRef } from "react";

export default function ExponentialDecayTitle() {
  const eqnRefs = {
    governing: useRef<HTMLDivElement>(null),
    solution: useRef<HTMLDivElement>(null),
    limit: useRef<HTMLDivElement>(null),
  };

  useEffect(() => {
    katex.render(String.raw`\frac{du}{dt} = -\lambda u`, eqnRefs.governing.current!, {
      throwOnError: false,
    });
    katex.render(String.raw`u(t) = u_0 e^{-\lambda t}`, eqnRefs.solution.current!, {
      throwOnError: false,
    });
    katex.render(String.raw`\lim_{t \to \infty} u(t) = 0`, eqnRefs.limit.current!, {
      throwOnError: false,
    });
  }, []);

  return (
    <div className="text-center space-y-4">
      <h1 className="text-2xl font-bold flex items-center justify-center gap-2">
        Exponential Decay
        <button
          title="Jump to Exponential Decay Case Study"
          className="text-lg text-gray-400 hover:text-purple-700 transition-colors"
          onClick={() => {
            document.getElementById('exponential-decay')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span role="img" aria-label="question">?</span>
        </button>
      </h1>

      <div id="exp-decay-details" className="flex flex-row space-x-8 text-base scroll-mt-24">
        <div className="flex-1">
          <span className="text-sm text-gray-500 block">Governing Equation</span>
          <div ref={eqnRefs.governing} className="inline-block text-sm" />
        </div>

        <div className="flex-1">
          <span className="text-sm text-gray-500 block">Analytical Solution</span>
          <div ref={eqnRefs.solution} className="inline-block text-sm" />
        </div>

        <div className="flex-1">
          <span className="text-sm text-gray-500 block">Long-Time Limit</span>
          <div ref={eqnRefs.limit} className="inline-block text-sm" />
        </div>
      </div>
    </div>
  );
}
