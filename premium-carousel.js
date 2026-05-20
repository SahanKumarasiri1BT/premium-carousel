import { useCallback as e, useEffect as t, useRef as n, useState as r } from "react";
//#region \0rolldown/runtime.js
var i = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), a = /* @__PURE__ */ ((e) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(e, { get: (e, t) => (typeof require < "u" ? require : e)[t] }) : e)(function(e) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw Error("Calling `require` for \"" + e + "\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.");
}), o = {
	settings: {
		defaultImageDurationMs: 6e3,
		popupDelayMs: 3e3,
		popupVisibleDurationMs: 5e3,
		defaultAspectRatio: "16:9",
		showAspectRatioSelector: !1,
		backgroundColor: "white"
	},
	playlist: [
		{
			type: "video",
			title: "Oceans",
			src: "https://vjs.zencdn.net/v/oceans.mp4",
			partner: {
				name: "AquaMedia",
				themeColor: "#2DD4BF"
			},
			resizeMode: "cover",
			clickThroughUrl: "https://example.com/aquamedia",
			frequencyCapPerDay: 5,
			playDurationMs: 8e3
		},
		{
			type: "image",
			title: "Mist-Covered Mountains",
			src: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
			partner: {
				name: "Peak Creative",
				themeColor: "#60A5FA"
			},
			resizeMode: "contain",
			clickThroughUrl: "https://example.com/peakcreative"
		},
		{
			type: "video",
			title: "Sintel Trailer",
			src: "https://media.w3.org/2010/05/sintel/trailer.mp4",
			partner: {
				name: "StudioWorks",
				themeColor: "#F472B6"
			},
			resizeMode: "cover",
			clickThroughUrl: "https://example.com/studioworks",
			frequencyCapPerDay: 5,
			playDurationMs: 1e4
		},
		{
			type: "image",
			title: "Sunlit Pine Forest",
			src: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
			partner: {
				name: "Forest Ads",
				themeColor: "#4ADE80"
			},
			resizeMode: "cover",
			clickThroughUrl: "https://example.com/forestads"
		},
		{
			type: "video",
			title: "Big Buck Bunny",
			src: "https://media.w3.org/2010/05/bunny/movie.mp4",
			partner: {
				name: "BunnyCast",
				themeColor: "#FBBF24"
			},
			resizeMode: "cover",
			clickThroughUrl: "https://example.com/bunnycast",
			frequencyCapPerDay: 5,
			playDurationMs: 7e3
		},
		{
			type: "image",
			title: "Coastal Sundown Horizon",
			src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
			partner: {
				name: "Coastline Partners",
				themeColor: "#38BDF8"
			},
			resizeMode: "contain",
			clickThroughUrl: "https://example.com/coastlinepartners"
		}
	]
}, s = "carousel_video", c = "video-js-stylesheet", l = "video-js-script", u = "https://vjs.zencdn.net/7.21.5/video-js.min.css", d = "https://vjs.zencdn.net/7.21.5/video.min.js", f = o, p = 5e3, m = 5;
function h(e) {
	let t = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	return `ad_impr_${e.title.replace(/\s+/g, "_")}_${t}`;
}
async function g(e) {
	let t = JSON.stringify({ impressions: e });
	for (let e = 0; e < 3; e++) {
		try {
			if ((await fetch("/api/ads/impression", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: t
			})).ok) return !0;
		} catch {}
		await new Promise((t) => setTimeout(t, 2 ** e * 250));
	}
	return !1;
}
function _({ elementRef: e, mediaItem: r }) {
	let i = n([]), a = n(null), o = n(null), s = typeof window < "u" && localStorage.getItem("ad_consent") === "granted";
	t(() => {
		function t(e) {
			let t = r.frequencyCapPerDay ?? 9999, o = h(r), s = Number(localStorage.getItem(o) || "0");
			if (!(s >= t)) {
				if (i.current.push(e), localStorage.setItem(o, String(s + 1)), i.current.length >= m) {
					n();
					return;
				}
				a.current ??= window.setTimeout(n, p);
			}
		}
		async function n() {
			a.current &&= (window.clearTimeout(a.current), null);
			let e = i.current.splice(0);
			e.length && s && await g(e);
		}
		function c(e) {
			let n = e[0];
			n && (n.intersectionRatio >= .5 ? o.current ??= window.setTimeout(() => {
				t({
					title: r.title,
					src: r.src,
					partner: r.partner?.name,
					timestamp: Date.now()
				}), o.current = null;
			}, 1e3) : o.current &&= (window.clearTimeout(o.current), null));
		}
		let l = e.current;
		if (!l || typeof IntersectionObserver > "u") return;
		let u = new IntersectionObserver(c, { threshold: [
			0,
			.5,
			1
		] });
		return u.observe(l), () => {
			u.disconnect(), a.current && window.clearTimeout(a.current), o.current && window.clearTimeout(o.current), s && i.current.length && g(i.current.splice(0));
		};
	}, [
		e,
		r,
		s
	]);
	function c(e) {
		s && (g([{
			title: r.title,
			src: r.src,
			partner: r.partner?.name,
			timestamp: Date.now()
		}]), e && window.open(e, "_blank", "noopener,noreferrer"));
	}
	return { reportClick: c };
}
//#endregion
//#region node_modules/react/cjs/react-jsx-runtime.production.js
var v = /* @__PURE__ */ i(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), y = /* @__PURE__ */ i(((e) => {
	process.env.NODE_ENV !== "production" && (function() {
		function t(e) {
			if (e == null) return null;
			if (typeof e == "function") return e.$$typeof === k ? null : e.displayName || e.name || null;
			if (typeof e == "string") return e;
			switch (e) {
				case v: return "Fragment";
				case b: return "Profiler";
				case y: return "StrictMode";
				case w: return "Suspense";
				case T: return "SuspenseList";
				case O: return "Activity";
			}
			if (typeof e == "object") switch (typeof e.tag == "number" && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), e.$$typeof) {
				case _: return "Portal";
				case S: return e.displayName || "Context";
				case x: return (e._context.displayName || "Context") + ".Consumer";
				case C:
					var n = e.render;
					return e = e.displayName, e ||= (e = n.displayName || n.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
				case E: return n = e.displayName || null, n === null ? t(e.type) || "Memo" : n;
				case D:
					n = e._payload, e = e._init;
					try {
						return t(e(n));
					} catch {}
			}
			return null;
		}
		function n(e) {
			return "" + e;
		}
		function r(e) {
			try {
				n(e);
				var t = !1;
			} catch {
				t = !0;
			}
			if (t) {
				t = console;
				var r = t.error, i = typeof Symbol == "function" && Symbol.toStringTag && e[Symbol.toStringTag] || e.constructor.name || "Object";
				return r.call(t, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", i), n(e);
			}
		}
		function i(e) {
			if (e === v) return "<>";
			if (typeof e == "object" && e && e.$$typeof === D) return "<...>";
			try {
				var n = t(e);
				return n ? "<" + n + ">" : "<...>";
			} catch {
				return "<...>";
			}
		}
		function o() {
			var e = A.A;
			return e === null ? null : e.getOwner();
		}
		function s() {
			return Error("react-stack-top-frame");
		}
		function c(e) {
			if (j.call(e, "key")) {
				var t = Object.getOwnPropertyDescriptor(e, "key").get;
				if (t && t.isReactWarning) return !1;
			}
			return e.key !== void 0;
		}
		function l(e, t) {
			function n() {
				P || (P = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", t));
			}
			n.isReactWarning = !0, Object.defineProperty(e, "key", {
				get: n,
				configurable: !0
			});
		}
		function u() {
			var e = t(this.type);
			return F[e] || (F[e] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release.")), e = this.props.ref, e === void 0 ? null : e;
		}
		function d(e, t, n, r, i, a) {
			var o = n.ref;
			return e = {
				$$typeof: g,
				type: e,
				key: t,
				props: n,
				_owner: r
			}, (o === void 0 ? null : o) === null ? Object.defineProperty(e, "ref", {
				enumerable: !1,
				value: null
			}) : Object.defineProperty(e, "ref", {
				enumerable: !1,
				get: u
			}), e._store = {}, Object.defineProperty(e._store, "validated", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: 0
			}), Object.defineProperty(e, "_debugInfo", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: null
			}), Object.defineProperty(e, "_debugStack", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: i
			}), Object.defineProperty(e, "_debugTask", {
				configurable: !1,
				enumerable: !1,
				writable: !0,
				value: a
			}), Object.freeze && (Object.freeze(e.props), Object.freeze(e)), e;
		}
		function f(e, n, i, a, s, u) {
			var f = n.children;
			if (f !== void 0) if (a) if (M(f)) {
				for (a = 0; a < f.length; a++) p(f[a]);
				Object.freeze && Object.freeze(f);
			} else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
			else p(f);
			if (j.call(n, "key")) {
				f = t(e);
				var m = Object.keys(n).filter(function(e) {
					return e !== "key";
				});
				a = 0 < m.length ? "{key: someKey, " + m.join(": ..., ") + ": ...}" : "{key: someKey}", R[f + a] || (m = 0 < m.length ? "{" + m.join(": ..., ") + ": ...}" : "{}", console.error("A props object containing a \"key\" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />", a, f, m, f), R[f + a] = !0);
			}
			if (f = null, i !== void 0 && (r(i), f = "" + i), c(n) && (r(n.key), f = "" + n.key), "key" in n) for (var h in i = {}, n) h !== "key" && (i[h] = n[h]);
			else i = n;
			return f && l(i, typeof e == "function" ? e.displayName || e.name || "Unknown" : e), d(e, f, i, o(), s, u);
		}
		function p(e) {
			m(e) ? e._store && (e._store.validated = 1) : typeof e == "object" && e && e.$$typeof === D && (e._payload.status === "fulfilled" ? m(e._payload.value) && e._payload.value._store && (e._payload.value._store.validated = 1) : e._store && (e._store.validated = 1));
		}
		function m(e) {
			return typeof e == "object" && !!e && e.$$typeof === g;
		}
		var h = a("react"), g = Symbol.for("react.transitional.element"), _ = Symbol.for("react.portal"), v = Symbol.for("react.fragment"), y = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), x = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), E = Symbol.for("react.memo"), D = Symbol.for("react.lazy"), O = Symbol.for("react.activity"), k = Symbol.for("react.client.reference"), A = h.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, j = Object.prototype.hasOwnProperty, M = Array.isArray, N = console.createTask ? console.createTask : function() {
			return null;
		};
		h = { react_stack_bottom_frame: function(e) {
			return e();
		} };
		var P, F = {}, I = h.react_stack_bottom_frame.bind(h, s)(), L = N(i(s)), R = {};
		e.Fragment = v, e.jsx = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !1, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		}, e.jsxs = function(e, t, n) {
			var r = 1e4 > A.recentlyCreatedOwnerStacks++;
			return f(e, t, n, !0, r ? Error("react-stack-top-frame") : I, r ? N(i(e)) : L);
		};
	})();
})), b = (/* @__PURE__ */ i(((e, t) => {
	process.env.NODE_ENV === "production" ? t.exports = v() : t.exports = y();
})))(), x = {
	cover: "object-cover",
	contain: "object-contain",
	fill: "object-fill"
}, S = {
	"16:9": "max-w-4xl",
	"4:3": "max-w-2xl",
	"1:1": "max-w-xl",
	"9:16": "max-w-sm"
}, C = {
	"16:9": "aspect-[16/9]",
	"4:3": "aspect-[4/3]",
	"1:1": "aspect-[1/1]",
	"9:16": "aspect-[9/16]"
};
function w({ activeItem: e, isMuted: t, onToggleMute: r, videoRef: i, aspectRatio: a }) {
	let o = n(null);
	_({
		elementRef: o,
		mediaItem: e
	});
	let c = e.type === "video", l = e.resizeMode ?? "cover", u = x[l];
	return /* @__PURE__ */ (0, b.jsx)("main", {
		ref: o,
		className: `mx-auto w-full ${S[a]} relative overflow-hidden rounded-3xl border border-slate-800 bg-black shadow-[0_20px_50px_rgba(0,0,0,0.8)] transition-all duration-500 ease-in-out`,
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: `relative w-full ${C[a]} transition-all duration-500 ease-in-out`,
			children: [
				e.partner && /* @__PURE__ */ (0, b.jsx)("div", {
					className: "absolute left-4 top-4 z-20 rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-100 shadow-lg",
					style: { borderColor: e.partner.themeColor ?? "transparent" },
					children: e.partner.name
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: `absolute inset-0 h-full w-full ${c ? "" : "hidden"}`,
					children: [/* @__PURE__ */ (0, b.jsx)("video", {
						id: s,
						className: `video-js vjs-default-skin h-full w-full ${u}`,
						muted: !0,
						autoPlay: !0,
						playsInline: !0,
						preload: "auto",
						ref: i,
						style: { objectFit: l }
					}), c && /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "absolute bottom-4 left-4 z-30 flex items-center gap-2 rounded-full bg-slate-950/80 p-2 shadow-xl backdrop-blur-md",
						children: [/* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							onClick: r,
							"aria-label": t ? "Unmute video" : "Mute video",
							className: "cursor-pointer rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20",
							children: /* @__PURE__ */ (0, b.jsx)("span", {
								className: "text-lg",
								children: t ? "🔇" : "🔊"
							})
						}), e.clickThroughUrl && /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							onClick: () => window.open(e.clickThroughUrl, "_blank", "noopener,noreferrer"),
							"aria-label": "Open advertiser link",
							className: "cursor-pointer rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20",
							children: /* @__PURE__ */ (0, b.jsx)("span", {
								className: "text-lg",
								children: "🔗"
							})
						})]
					})]
				}),
				!c && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("img", {
					className: `animate-fade-in absolute inset-0 z-10 h-full w-full ${u}`,
					src: e.src,
					alt: e.title,
					style: { objectFit: l }
				}), e.clickThroughUrl && /* @__PURE__ */ (0, b.jsx)("div", {
					className: "absolute bottom-4 left-4 z-30 flex items-center gap-2 rounded-full bg-slate-950/80 p-2 shadow-xl backdrop-blur-md",
					children: /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						onClick: () => window.open(e.clickThroughUrl, "_blank", "noopener,noreferrer"),
						"aria-label": "Open advertiser link",
						className: "cursor-pointer rounded-full border border-white/20 bg-white/10 p-2 text-white transition hover:bg-white/20",
						children: /* @__PURE__ */ (0, b.jsx)("span", {
							className: "text-lg",
							children: "🔗"
						})
					})
				})] })
			]
		})
	});
}
//#endregion
//#region src/components/MediaStage.tsx
function T({ activeItem: e, isMuted: t, onToggleMute: n, videoRef: r, aspectRatio: i }) {
	return /* @__PURE__ */ (0, b.jsx)(w, {
		activeItem: e,
		isMuted: t,
		onToggleMute: n,
		videoRef: r,
		aspectRatio: i
	});
}
//#endregion
//#region src/components/InterestList.tsx
function E({ interests: e }) {
	return e.length === 0 ? null : /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "mt-12 border-t border-slate-800 pt-6 transition-all duration-300",
		children: [/* @__PURE__ */ (0, b.jsxs)("h2", {
			className: "mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400",
			children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
				className: "text-blue-500",
				fill: "none",
				height: "14",
				viewBox: "0 0 24 24",
				width: "14",
				xmlns: "http://www.w3.org/2000/svg",
				children: [/* @__PURE__ */ (0, b.jsx)("path", {
					d: "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",
					stroke: "currentColor",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: "2.5"
				}), /* @__PURE__ */ (0, b.jsx)("circle", {
					cx: "12",
					cy: "7",
					r: "4",
					stroke: "currentColor",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: "2.5"
				})]
			}), "Your Interests"]
		}), /* @__PURE__ */ (0, b.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: e.map((e) => /* @__PURE__ */ (0, b.jsx)("span", {
				className: "rounded-lg border border-blue-500/20 bg-slate-800 px-3.5 py-1.5 text-sm font-medium text-blue-400 shadow-sm transition-all hover:scale-105",
				children: e
			}, e))
		})]
	});
}
//#endregion
//#region src/components/InterestPopup.tsx
function D({ isVisible: e, onInterest: t }) {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: `absolute right-6 top-6 z-50 transform transition-all duration-300 ${e ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-5 opacity-0"}`,
		children: /* @__PURE__ */ (0, b.jsxs)("button", {
			className: "cursor-pointer group flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-bold text-white shadow-2xl backdrop-blur-md transition-all hover:bg-white/20 active:scale-95",
			onClick: t,
			type: "button",
			children: ["interested?", /* @__PURE__ */ (0, b.jsx)("svg", {
				className: "transition-transform group-hover:translate-x-0.5",
				fill: "none",
				height: "14",
				viewBox: "0 0 24 24",
				width: "14",
				xmlns: "http://www.w3.org/2000/svg",
				children: /* @__PURE__ */ (0, b.jsx)("path", {
					d: "m9 18 6-6-6-6",
					stroke: "currentColor",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: "3"
				})
			})]
		})
	});
}
//#endregion
//#region src/components/LoadingScreen.tsx
function O() {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-slate-950 text-white",
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "flex flex-col items-center gap-3",
			children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
				className: "h-8 w-8 animate-spin text-blue-500",
				fill: "none",
				viewBox: "0 0 24 24",
				children: [/* @__PURE__ */ (0, b.jsx)("circle", {
					className: "opacity-25",
					cx: "12",
					cy: "12",
					r: "10",
					stroke: "currentColor",
					strokeWidth: "4"
				}), /* @__PURE__ */ (0, b.jsx)("path", {
					className: "opacity-75",
					fill: "currentColor",
					d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				})]
			}), /* @__PURE__ */ (0, b.jsx)("p", {
				className: "text-sm font-semibold text-slate-400",
				children: "Loading Media Experience..."
			})]
		})
	});
}
//#endregion
//#region src/hooks/useVideoJsLoader.ts
function k() {
	let [e, n] = r(() => !!window.videojs);
	return t(() => {
		let e = !0, t = document.getElementById(l);
		if (!document.getElementById("video-js-stylesheet")) {
			let e = document.createElement("link");
			e.id = c, e.rel = "stylesheet", e.href = u, document.head.appendChild(e);
		}
		if (window.videojs) return;
		if (t) {
			let r = () => {
				e && n(!0);
			};
			return t.addEventListener("load", r), () => {
				e = !1, t.removeEventListener("load", r);
			};
		}
		let r = document.createElement("script");
		return r.id = l, r.src = d, r.async = !0, r.onload = () => {
			e && n(!0);
		}, document.body.appendChild(r), () => {
			e = !1;
		};
	}, []), e;
}
//#endregion
//#region src/hooks/useMediaCarousel.ts
function A(i = f) {
	let a = k(), [o, s] = r(0), [c, l] = r(i.playlist[0].type === "video"), [u, d] = r(0), [p, m] = r(0), [h, g] = r(!1), [_, v] = r(!0), [y, b] = r(!1), [x, S] = r([]), [C, w] = r(i.settings.defaultAspectRatio ?? "16:9"), [T, E] = r(i.settings.showAspectRatioSelector ?? !0), D = n(null), O = n(null), A = n(o), j = n(0), M = n(null), N = n(null), P = n(null), F = n(null), I = n(null);
	t(() => {
		A.current = o;
	}, [o]);
	let L = e(() => {
		M.current &&= (window.clearTimeout(M.current), null), N.current &&= (window.clearTimeout(N.current), null);
	}, []), R = e(() => {
		F.current &&= (window.cancelAnimationFrame(F.current), null);
	}, []), z = e(() => {
		I.current &&= (window.clearTimeout(I.current), null);
	}, []), B = e(() => {
		P.current &&= (window.cancelAnimationFrame(P.current), null);
	}, []), V = e(() => {
		b(!1), N.current &&= (window.clearTimeout(N.current), null);
	}, []), H = e(() => {
		s((e) => (e + 1) % i.playlist.length);
	}, [i.playlist.length]), U = e((e) => {
		s(e);
	}, []), W = e(() => {
		b(!0), N.current && window.clearTimeout(N.current), N.current = window.setTimeout(V, i.settings.popupVisibleDurationMs);
	}, [V]), G = e(() => {
		let e = i.playlist[A.current];
		S((t) => t.includes(e.title) ? t : [...t, e.title]), V();
	}, [V]), K = e((e) => e < o ? 100 : e > o ? 0 : c ? u : p, [
		o,
		p,
		c,
		u
	]);
	t(() => {
		if (!a || !window.videojs || !D.current) return;
		let e = window.videojs.getPlayer("carousel_video") ?? window.videojs(D.current, {
			autoplay: !0,
			controls: !1,
			fluid: !0,
			loop: !1,
			muted: !0,
			preload: "auto"
		}), t = () => {
			let t = e.duration();
			t && d(e.currentTime() / t * 100);
		}, n = () => {
			i.playlist[A.current].type === "video" && e.error() && H();
		}, r = () => g(!0), o = () => g(!1), s = () => v(e.muted());
		return O.current = e, e.muted(!0), g(!e.paused()), v(!0), e.on("timeupdate", t), e.on("ended", H), e.on("error", n), e.on("play", r), e.on("pause", o), e.on("volumechange", s), () => {
			e.off("timeupdate", t), e.off("ended", H), e.off("error", n), e.off("play", r), e.off("pause", o), e.off("volumechange", s), e.dispose(), O.current = null;
		};
	}, [H, a]), t(() => {
		if (!a) return;
		L(), R(), B();
		let e = i.playlist[o];
		if (P.current = window.requestAnimationFrame(() => {
			b(!1), m(0), d(0), l(e.type === "video"), P.current = null;
		}), e.type === "video") O.current && (z(), O.current.pause(), O.current.src([{
			src: e.src,
			type: "video/mp4"
		}]), O.current.ready(() => {
			O.current?.play().catch((e) => {
				e.name !== "AbortError" && H();
			});
		}), e.playDurationMs && e.playDurationMs > 0 && (I.current = window.setTimeout(() => {
			H();
		}, e.playDurationMs)));
		else {
			O.current?.pause();
			let e = i.settings.defaultImageDurationMs;
			j.current = performance.now();
			let t = (n) => {
				let r = n - j.current;
				if (m(Math.min(r / e * 100, 100)), r >= e) {
					H();
					return;
				}
				F.current = window.requestAnimationFrame(t);
			};
			F.current = window.requestAnimationFrame(t);
		}
		return M.current = window.setTimeout(W, i.settings.popupDelayMs), () => {
			L(), R(), z(), B();
		};
	}, [
		R,
		L,
		B,
		o,
		H,
		a,
		W
	]), t(() => () => {
		L(), R(), z(), B();
	}, [
		R,
		L,
		B
	]);
	let q = e(() => {
		let e = O.current;
		e && (e.paused() ? e.play().catch((e) => {
			e.name !== "AbortError" && H();
		}) : e.pause());
	}, [H]), J = e(() => {
		let e = O.current;
		if (!e) return;
		let t = e.muted();
		e.muted(!t), v(!t);
	}, []);
	return {
		activeItem: i.playlist[o],
		currentIndex: o,
		getProgressPercentage: K,
		interests: x,
		isVideo: c,
		isVideoJsLoaded: a,
		isPlaying: h,
		isMuted: _,
		jumpToSlide: U,
		markCurrentSlideInterested: G,
		playlist: i.playlist,
		showPopup: y,
		togglePlayback: q,
		toggleMute: J,
		videoRef: D,
		aspectRatio: C,
		setAspectRatio: w,
		showRatioControls: T,
		setShowRatioControls: E
	};
}
//#endregion
//#region src/components/CarouselPlayer.tsx
function j({ config: e, className: t = "" }) {
	let { activeItem: n, interests: r, isVideoJsLoaded: i, isMuted: a, markCurrentSlideInterested: o, showPopup: s, toggleMute: c, videoRef: l } = A(e);
	if (!i) return /* @__PURE__ */ (0, b.jsx)(O, {});
	let u = e?.settings?.backgroundColor || "white";
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: `flex h-full w-full flex-col items-center justify-center p-4 text-white ${t}`.trim(),
		style: { backgroundColor: u },
		children: /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "w-full max-w-4xl",
			children: [/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "group relative",
				children: [/* @__PURE__ */ (0, b.jsx)(T, {
					activeItem: n,
					isMuted: a,
					onToggleMute: c,
					videoRef: l,
					aspectRatio: e?.settings.defaultAspectRatio ?? "16:9"
				}), /* @__PURE__ */ (0, b.jsx)(D, {
					isVisible: s,
					onInterest: o
				})]
			}), /* @__PURE__ */ (0, b.jsx)(E, { interests: r })]
		})
	});
}
//#endregion
export { j as CarouselPlayer, T as MediaStage, A as useMediaCarousel };
