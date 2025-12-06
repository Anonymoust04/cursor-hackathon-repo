"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function NetworkingFeed() {
  return (
    <div className={`${inter.variable} font-sans bg-slate-50 text-slate-900`}>
      <header className="sticky top-0 z-50 flex h-16 items-center justify-center border-b border-slate-200 bg-white backdrop-blur-sm">
        <div className="container mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-slate-900">
              <div className="h-8 w-8 text-[#0077B5]">
                <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10.6.4c.5-.5 1.4-.5 1.9 0l1.7 1.7c.2.2.5.3.8.3.4 0 .8-.2 1.1-.5l1.6-1.1c.6-.4 1.4-.2 1.8.4l.8 1.2c.2.4.6.6 1 .6.5 0 .9-.3 1.2-.7l.9-1.2c.4-.6 1.2-.7 1.8-.3l1.1 1.6c.3.4.7.6 1.1.5.4 0 .8-.2 1.1-.5l1.7-1.7c.5-.5 1.4-.5 1.9 0l.4.4c.5.5.5 1.4 0 1.9l-1.7 1.7c-.2.2-.3.5-.3.8 0 .4.2.8.5 1.1l1.1 1.6c.4.6.2 1.4-.4 1.8l-1.2.8c-.4.2-.6.6-.6 1 0 .5.3.9.7 1.2l1.2.9c.6.4.7 1.2.3 1.8l-1.6 1.1c-.4.3-.6.7-.5 1.1 0 .4.2.8.5 1.1l1.7 1.7c.5.5.5 1.4 0 1.9l-.4.4c-.5.5-1.4.5-1.9 0l-1.7-1.7c-.2-.2-.5-.3-.8-.3-.4 0-.8.2-1.1.5l-1.6 1.1c-.6.4-1.4.2-1.8-.4l-.8-1.2c-.2-.4-.6-.6-1-.6-.5 0-.9.3-1.2.7l-.9 1.2c-.4.6-1.2.7-1.8.3l-1.1-1.6c-.3-.4-.7-.6-1.1-.5-.4 0-.8.2-1.1.5l-1.7 1.7c-.5.5-1.4.5-1.9 0l-8.2-8.2c-.5-.5-.5-1.4 0-1.9L10.6.4zM13 10.3l-5 5.7h4l-1 5 5-5.7H12l1-5z M5.4 12c0-1.2.5-2.4 1.3-3.2L2.2 4.3C.8 5.7.1 7.6.1 9.5c0 1.9.7 3.8 2.1 5.2l4.5-4.5c-.8-.9-1.3-2-1.3-3.2zm13.2-7.7L14.1 8.8c.9.8 1.4 2 1.4 3.2 0 1.2-.5 2.4-1.3 3.2l4.5 4.5c1.4-1.4 2.1-3.3 2.1-5.2 0-1.9-.7-3.8-2.1-5.2z"></path>
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-[#0077B5]">ImpactHub</span>
            </div>
            <div className="relative hidden sm:block">
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">search</span>
              <input
                className="h-10 w-full min-w-[280px] rounded-full border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm font-normal placeholder:text-slate-500 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                placeholder="Search..."
                type="search"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <nav className="hidden items-center gap-6 lg:flex">
              <Link className="text-sm font-medium text-blue-600" href="#">
                Home
              </Link>
              <Link className="text-sm font-medium text-slate-500 hover:text-blue-600" href="#">
                Gigs
              </Link>
              <Link className="text-sm font-medium text-slate-500 hover:text-blue-600" href="#">
                Projects
              </Link>
              <Link className="text-sm font-medium text-slate-500 hover:text-blue-600" href="#">
                Messages
              </Link>
              <Link className="text-sm font-medium text-slate-500 hover:text-blue-600" href="#">
                Notifications
              </Link>
            </nav>
            <div className="flex items-center gap-2">
              <Image
                alt="User profile picture of Alex Chen"
                className="aspect-square size-10 rounded-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOHS09b1DeTMN6ZkMF6Hzeo_HpDiGAO4a_JS25l__Js9CXYJAuN5oXzOeE5OTH_dDPb0raf5NEEK8Jbycu_xxJSP9YFTMiVsQA8sLOVRgpUCOzQVdeHq43zh2MJ2HJVTeMIL5JsTgxf6knRgTSTK_O46oclYpxve5z8GP-y3Wn6A_8jqTMoOWQ52WhDdfw6rHK2MGLy_K_g9-mp1nlZNojti3xL2DJjkaX6zOHnDub6_jYoQH41o2wah9wjcUgwMu4ccpcks0T6Gs"
                width={40}
                height={40}
              />
              <div className="hidden items-center md:flex">
                <span className="material-symbols-outlined text-slate-500">arrow_drop_down</span>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-12 gap-8">
          <aside className="sticky top-24 col-span-12 h-fit space-y-6 md:col-span-3">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white text-center shadow-sm">
              <div className="h-20 bg-gradient-to-r from-blue-400 to-yellow-400"></div>
              <div className="relative p-4">
                <div className="absolute -top-10 left-1/2 -translate-x-1/2">
                  <Image
                    alt="User profile picture of Alex Chen"
                    className="aspect-square w-20 rounded-full object-cover ring-4 ring-white"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtOH5GUGui-Z54EEKZ8NJCfNQGmUrGTdlW_zgVKKCBX8HN99-fhUcgG_jI-wNcnu7JANGgBklZIAaWG3oCIeF95DJk1cGgoMLXXMwVGGq9TtnvuajZgHaMw9rgaviW52nDgBPDciEyATz6jkc2EZKTLvjM-F87fUA1sJvnehbCJqOV6Kt9-Fq2nblzVOR88tPGKAhSFHe5UfRcaynZLTsnfXFUrUCi_7ukbxyGC3UTQsO24RHWR6SvlPf-jC98gt73x6uB-a2AxPI"
                    width={80}
                    height={80}
                  />
                </div>
                <div className="mt-10 flex flex-col items-center justify-center">
                  <p className="text-lg font-bold">Alex Chen</p>
                  <p className="text-sm text-slate-500">Social Impact Advocate | Student</p>
                </div>
              </div>
              <div className="border-t border-slate-200 p-4">
                <div className="flex justify-around">
                  <div className="text-center">
                    <p className="text-lg font-bold">150</p>
                    <p className="text-xs text-slate-500">Connections</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">12</p>
                    <p className="text-xs text-slate-500">Projects</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-1 shadow-sm">
              <Link className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 text-blue-600 bg-blue-50" href="#">
                <span className="material-symbols-outlined">home</span>
                <p className="text-sm font-semibold">Home</p>
              </Link>
              <Link className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50" href="#">
                <span className="material-symbols-outlined text-slate-500">work</span>
                <p className="text-sm font-medium">My Gigs</p>
              </Link>
              <Link className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50" href="#">
                <span className="material-symbols-outlined text-slate-500">lightbulb</span>
                <p className="text-sm font-medium">My Projects</p>
              </Link>
              <Link className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50" href="#">
                <span className="material-symbols-outlined text-slate-500">bookmark</span>
                <p className="text-sm font-medium">Saved Posts</p>
              </Link>
            </div>
          </aside>
          <div className="col-span-12 space-y-6 md:col-span-6">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-4">
                <Image
                  alt="User profile picture of Alex Chen"
                  className="aspect-square size-12 flex-shrink-0 rounded-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDKRUAf6BnaOiKjmSghfPsBPkWc98dPnAKVV-L2P-2Peg5yN3FixS77bu6Xrpl05r1nAxqrGrb7PY69bUYRQXFZhU1aT1HYyr78uUD76CpMnAXI4x-KuxNqR35ppL4ZhB7-T8eTYHSn_MIZoy5rw1vT6vXeQMN5r-LQkBpqcoGV_p2DpMRyUO3wtb3RRRbIkSLfnnKdFVGgtGVh3f46UYUzH-jbSipdQaZdZuFmHd1MdWGPUfTOCO87JXh4TRlUgdibHf8xFmINDps"
                  width={48}
                  height={48}
                />
                <div className="w-full">
                  <textarea
                    className="w-full rounded-lg border-slate-200 bg-slate-50 focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                    placeholder="What's on your mind, Alex?"
                    rows={2}
                  ></textarea>
                </div>
              </div>
              <div className="mt-3 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-500 hover:bg-gray-100">
                    <span className="material-symbols-outlined text-lg">image</span>
                    Photo
                  </button>
                  <button className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-500 hover:bg-gray-100">
                    <span className="material-symbols-outlined text-lg">videocam</span>
                    Video
                  </button>
                  <button className="flex items-center gap-2 rounded-lg p-2 text-sm text-slate-500 hover:bg-gray-100">
                    <span className="material-symbols-outlined text-lg">add_box</span>
                    Project
                  </button>
                </div>
                <button className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors">
                  Post
                </button>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="p-4">
                  <div className="flex items-center gap-3">
                    <Image
                      alt="Community Builders logo"
                      className="aspect-square size-10 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAk6fGZReJZxCI0SrEICYSnazeICxViySlNuIV0POCwzELcHyY-soJU_SNBkTv56yC-DIBcHzMx6I23L9KDLzemu8-Pr9QyWNopWZTsF5fyz1PJ5rW58GCUDTg9X_EVZTLWrNEjso_-55ClvbboyEWIuejEdroAU3MyLKcDXdLyPzMSJTo-MFfkrnKUxc1JF4kcTLlZC5LTucwzHWjgTeQ459qFipMKhFRjfMeMC5CQhO8yJniMAz8ZdvzLZWLZNj9WLbMspQ2Sy9o"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="font-semibold text-sm">Community Builders</p>
                      <p className="text-xs text-slate-500">2 hours ago</p>
                    </div>
                    <div className="ml-auto">
                      <span className="material-symbols-outlined text-slate-500">more_horiz</span>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-slate-900">
                    We're looking for volunteers to help build a new community garden in downtown Springfield! This project aims to provide fresh produce for local families and create a beautiful green space for everyone. No experience needed, just a positive attitude! 🌱
                  </p>
                </div>
                <div className="relative aspect-video w-full overflow-hidden">
                  <Image
                    alt="Volunteers working in a community garden"
                    className="object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2DGUirA62lGHQxABDIkY0mg855JQNE4SBK-4X5_8Y1zxBkWgRg4XMHwDUwHHVCrzv2rMtRJE_kMjyE7SJEIatAyoGuWtLlap1iVcojEOW19przw5j6V45fX4byYvjsuNMBBXo7FWYiZ5dEPcDacPa1Mh9-vUrQQaXD-qrpO_fjn-CsiMJknZ0FTmaTr1_dZGS-2na4t3UoksKz1PEyjam9zYfpCkejTj99qvpKjnyLgStJAh8kn1gSUh7WhvfWzN50s_4dKaNfx4"
                    fill
                  />
                </div>
                <div className="flex items-center justify-between p-2 border-t border-slate-200">
                  <div className="flex items-center gap-1">
                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                      <span className="material-symbols-outlined text-lg">thumb_up</span>
                      Like
                    </button>
                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                      <span className="material-symbols-outlined text-lg">comment</span>
                      Comment
                    </button>
                    <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                      <span className="material-symbols-outlined text-lg">share</span>
                      Share
                    </button>
                  </div>
                  <button className="rounded-lg bg-blue-600 text-white px-4 py-2 text-sm font-semibold shadow-sm hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Image
                    alt="Profile picture of Sarah Minh"
                    className="aspect-square size-10 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt36LPL4W7FBUY-spkOL7MbIvU3_dX88Eb-jr5aFBNZwFkgWFU-6JXgVfCDhQX2DAyyijQZaL6tGA-mw84utHQXT6QGqsN4VN1yQEzNc8pI42OzhsBrDj0zBhUe4lGyZOSUvvOGfJ6xDexGVWraeiCaYueh1DBrPewdaUJykod2PVmDMxG596z_HepI6tnw7ErNIcnXyd3dco-x00E8R9EXIkXU_MYxhfX2jfKSHFj-KdcMVJRyi98J5IC2k9V1KB7pPfPp4cXi08"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold text-sm">Sarah Minh</p>
                    <p className="text-xs text-slate-500">1 day ago</p>
                  </div>
                  <div className="ml-auto">
                    <span className="material-symbols-outlined text-slate-500">more_horiz</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-900">
                  Feeling incredibly inspired after attending the Global Impact Summit this weekend. The discussions around circular economies were particularly eye-opening. It's clear that collaborative corporate and community action is the key to a sustainable future. Happy to connect with anyone who was there!
                </p>
                <div className="flex items-center gap-1 mt-4 border-t border-slate-200 pt-2">
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    Like
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-lg">comment</span>
                    Comment
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-lg">share</span>
                    Share
                  </button>
                </div>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <Image
                    alt="GreenTech Innovations logo"
                    className="aspect-square size-10 rounded-lg object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgwk4S4pld3ZkCn_Miozx1oBuZnrB1GYo4cUKS9bHQiKLOuas5N9hUPKetcpfEQYhvAo4unKIQN7kT7ZrA6RrhqLSYyNYKW49JlZcGAR7F5nf2y8Es1iiWHUpxxZNM5F5HKE5pVi8sSyhVTyHkpTXBklLodV-xkAXa70hj9vUGRrQoSS8Cdh0SWoQgNWa54fCdrOaIZZ12zyhzBPLwg4CKLVcpcXeIuIZdwtwlIVTNEf_TUyavyA_f4fB-Z-R1w-fL3Lh94HqVwsc"
                    width={40}
                    height={40}
                  />
                  <div>
                    <p className="font-semibold text-sm">GreenTech Innovations</p>
                    <p className="text-xs text-slate-500">3 days ago</p>
                  </div>
                  <div className="ml-auto">
                    <span className="material-symbols-outlined text-slate-500">more_horiz</span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-900">
                  We are thrilled to announce our new "Tech for Trees" initiative! For every new software license sold, we will plant 10 trees in partnership with the Rainforest Alliance. This is part of our commitment to be carbon neutral by 2030. Learn more on our blog.
                </p>
                <div className="flex items-center gap-1 mt-4 border-t border-slate-200 pt-2">
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-lg">thumb_up</span>
                    Like
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-lg">comment</span>
                    Comment
                  </button>
                  <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-500 hover:bg-slate-50">
                    <span className="material-symbols-outlined text-lg">share</span>
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
          <aside className="sticky top-24 col-span-12 h-fit space-y-6 md:col-span-3">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <h3 className="font-semibold text-sm mb-4">Suggestions</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      alt="Clean Oceans Org logo"
                      className="aspect-square size-10 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVfLmdkhuk4RAQwM2aKsBNNYF_Pxoq_piuZc-iQ4gWUajVv7QaDyMvFt6xU3klAUd2WGIKcSVQSrAOeQ7INxm4NW8XuIpUXtCUemPfM_9RgN1Osv0cDwNOQlctGZNFiO4VpjGac1IZ0q_0ecEPlh0f6GzDfowmoUg2JxzAfLWPgZomSw_FdF3dVmuJsWLXeqOTybvILk-kO8zd94B86BJOYp9HiJOEN4lmnF0-qQN-7nUELuAPg5iCcwXKUJBeqHZKTpzPpGrA3Ic"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Social Media Manager</p>
                    <p className="text-xs text-slate-500">Clean Oceans Org</p>
                    <button className="mt-2 rounded-full border border-blue-600 text-blue-600 px-4 py-1 text-xs font-semibold shadow-sm hover:bg-blue-50 transition-colors">
                      Apply
                    </button>
                  </div>
                  <button>
                    <span className="material-symbols-outlined text-slate-500 text-xl">close</span>
                  </button>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <Image
                      alt="Literacy First logo"
                      className="aspect-square size-10 rounded-full object-cover"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJ1o7hCQorvGhPQEkPy6w2xw2WyFzrW0DYVw6jrTkqYDQtOKKFZL_5_wDWti6z9OarkmVkRVyKYUtzSQ9MOikoyZXg9nhMAvMxxT9jC0ZMg-vqUGqdiaKQD_OlnveSjpuHZCddo7nMv6wFogs6RpxHJFlXvSJPDLszZnQuDVX-WrLyVefL3ZwrLDIOACTZKiy9bDET4s6WaP-UHFv-QQV-12KMYVcRJmwuRsUnlEC90__vX3KZoBq8BWFs53Ua0-mirFBHntm_CXw"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">Web Dev Volunteer</p>
                    <p className="text-xs text-slate-500">Literacy First</p>
                    <button className="mt-2 rounded-full border border-blue-600 text-blue-600 px-4 py-1 text-xs font-semibold shadow-sm hover:bg-blue-50 transition-colors">
                      Apply
                    </button>
                  </div>
                  <button>
                    <span className="material-symbols-outlined text-slate-500 text-xl">close</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

