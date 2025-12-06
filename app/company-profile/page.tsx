"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Sora } from "next/font/google";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-sora",
});

export default function CompanyProfile() {
  const galleryScrollRef = useRef<HTMLDivElement>(null);
  const sponsorsScrollRef = useRef<HTMLDivElement>(null);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryScrollRef.current) {
      const scrollAmount = 400; // Adjust scroll distance as needed
      galleryScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollSponsors = (direction: "left" | "right") => {
    if (sponsorsScrollRef.current) {
      const scrollAmount = 200; // Adjust scroll distance as needed
      sponsorsScrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className={`${sora.variable} font-sans bg-white text-slate-700`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold text-slate-900">
                ImpactHub
              </Link>
              <div className="relative hidden md:block">
                <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input
                  className="w-64 rounded-lg border-slate-300 bg-white py-2 pl-10 pr-4 text-sm text-slate-800 focus:border-blue-600 focus:ring-blue-600"
                  placeholder="Search..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100 sm:block">
                My Engagements
              </button>
              <button className="rounded-full p-2 hover:bg-slate-100">
                <span className="material-icons text-slate-500">help_outline</span>
              </button>
              <button className="rounded-full p-2 hover:bg-slate-100">
                <span className="material-icons text-slate-500">favorite_border</span>
              </button>
              <button className="rounded-full p-2 hover:bg-slate-100">
                <span className="material-icons text-slate-500">notifications_none</span>
              </button>
              <div className="h-6 w-px bg-slate-200"></div>
              <button className="flex items-center gap-2">
                <Image
                  alt="User profile picture"
                  className="h-8 w-8 rounded-full"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBtMp1Vp2NGavxOXpzO-CHSo2-qouq_vIDcqd3fu7H2pcNZL8q6ZP5luOLlRq_XEB6A-HusIgvmF0uBxaxJQwRM5rP2V8RMlpNN3LZIvUqBgNvRXnJyDFeoERu5JvD0kJ-JeNm9WmmSZGFyR94Ve629iatD6dnyN2vlJS9VaTmCAnEZoGrx3GbQasBWusGmJ-cv0g-_Koul25Cgz5MCRXbcgtVblOV7Sln6XfMkHUN7j78j1Z5bXH0rhez7fQxinutBkNWRYPTo-MU"
                  width={32}
                  height={32}
                />
                <span className="material-icons text-slate-500">expand_more</span>
              </button>
            </div>
          </div>
        </header>

        <main className="mt-8">
          <div className="relative overflow-hidden rounded-xl bg-blue-50">
            <div className="absolute -bottom-20 -left-20 h-48 w-48 rounded-full bg-blue-100"></div>
            <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-blue-100"></div>
            <div className="relative flex min-h-[250px] items-center justify-between px-8 py-12 sm:px-12">
              <div className="flex items-center gap-6">
                <div className="hidden shrink-0 rounded-lg bg-white p-3 shadow-sm md:block">
                  <Image
                    alt="Company logo"
                    className="h-16 w-16 object-contain"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDlJ8bMhya4sEcSGsv6J3kcuctn4Xpgbbk4vRMw9wcrXkEfzDlc-w5gNIXHh5gFOYi8pmAjXN4Sk_sWVXH4LR12JOi0oVf2z_6YeQ8tH80kVi1_TIkZJYA_c9p0nO78ULTkEInxOJXATBzTnPiPyXJ0t9xp17cSCR-lPKvsDOC_IV6cx7uStGd2PMuO8LyD4fUYNCxZz2bNa3JCak7-0YG_vz8GvwIsOqDTwQ7U1FwCMPAIXNHzLBBa4q4V7xixLvoffclth-4e0Ug"
                    width={64}
                    height={64}
                  />
                </div>
                <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl lg:text-6xl">
                  Innovate, Impact, <br />Inspire.
                </h1>
              </div>
              <div className="relative hidden h-64 w-64 shrink-0 lg:block">
                <Image
                  alt="Smiling person in professional attire"
                  className="absolute right-0 top-0 h-24 w-24 rounded-full border-4 border-blue-50 object-cover shadow-lg"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqWXckKdHlIRqBQAlQ7CX93eFe-4eO9RPF1UOXV3Y3XrRgGaNi2UqpBt4Od8rQU-rgVu5TjrUYNoAsxnK8V4uM6bXbyHluvMojnGO0oCffFA0x1my0qtSAoANMCyuWuff0ErCOpHE_ievUefTxSQS5nfiwMbjLXOGTrldg1xho3vqUW731d33uqvr_OaxlkfzvuSk_7GZ3t1VLfv8afUNca1mLyQgJJKQSxAjMsDJQD79G9Tlyg1yvZQwFuH1mA54wLXdytjjvZqU"
                  width={96}
                  height={96}
                />
                <Image
                  alt="Smiling person in a casual setting"
                  className="absolute bottom-8 left-0 h-32 w-32 rounded-full border-4 border-blue-50 object-cover shadow-lg dark:border-slate-800"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5_lOLisTFHwPjPSDKgrWfYpyXhmzJL-dYv07f3p5hXhaJIZRT6KcT_ZlXjWdKBR_x_6_t8qbyzmH_-upc9iGhJ0H6kpQDbsfqV4fvx6vO0vgkskZeH3UeuUBdBv2GgMO444FKx0shLC1CbLdIb9bSlX3BI1OB0T1WXNFpkPDOmA6DNyd-kSYA3GUn0ZwC2yDwFAjWKKIUcqD2gNR750V6Ucdj0StC5G46oKFBUxsoN9yM6aq1-k4z771Qlz3Q6H_Q4CjC6_FhMkw"
                  width={128}
                  height={128}
                />
                <Image
                  alt="Smiling person with glasses"
                  className="absolute bottom-0 right-8 h-20 w-20 rounded-full border-4 border-blue-50 object-cover shadow-lg dark:border-slate-800"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcatL7xilrMRq4ujDLWBJOzECzWZEd11p0tGcJWLzkpaStBHyBeWYx5ppqR5Oq1BP5vP_gPxI85l1qQ7Vw20p4JP0KNGXPewEKFNAlTv9AS_WgdNhhfcmPWFZg3ODrmBDv0ERnR4AsPBJbUJc5sqGgsCn_o4PoEH4Va1-I_BNuriMys95lOkXLm4MQ887YDxsF7DF-Oge_utlCHPzWU4pizisowUe0uywuFOBEXZ5kEHU7-rsaoV1L1ivgMAnWM8fcXru1ZyZj4BI"
                  width={80}
                  height={80}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <aside className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <Image
                      alt="Company logo"
                      className="h-12 w-12 rounded-md object-contain md:hidden"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB1Zhfs5XG8_fdmtIHP-XO8ghOEegfd6pqG7dp4b65ZoG-Z9OnZaf2hN42zDfyitSmK9kv8HW9ZtZAKhAdrY40Ei6sJ7donxw9pn7VFXax3XTDndw4de14wU_YeaMQUI3auNtMiJ_-c71Cn82YZrdlbAKjraYKZlRLWFQSH_mL5-XhUVFpmiTYOozM0l4kYV5icstOL8zkpA8gYZHGGLb8PwfSBRQbaZmKT_csIiwWb-0ZX2KfQb-lOzGfh56hWiw6mh55Yd5E1Ilc"
                      width={48}
                      height={48}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold text-slate-900">Tech Solutions Inc.</h2>
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-600">
                          <span className="material-icons text-sm">verified</span> ELITE
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1">
                        <span className="material-icons text-lg text-yellow-400">star</span>
                        <span className="font-semibold text-slate-800">4.8</span>
                        <span className="text-sm text-slate-500">(21 Reviews)</span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed">
                    Tech Solutions Inc. is a global leader in software, cloud computing, and AI solutions, empowering individuals and businesses with cutting-edge technology.
                  </p>
                  <div className="mt-6 space-y-4 text-sm">
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-slate-400">groups</span>
                      <div>
                        <p className="font-semibold text-slate-800">220,000 Employees</p>
                        <p className="text-xs text-slate-500">Headcount</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-slate-400">location_on</span>
                      <div>
                        <p className="font-semibold text-slate-800">Redmond, WA, GMT-08:00</p>
                        <p className="text-xs text-slate-500">Location & Timezone</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-slate-400">payments</span>
                      <div>
                        <p className="font-semibold text-slate-800">€50-70/ hour</p>
                        <p className="text-xs text-slate-500">Average Hourly Rate</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-slate-400">paid</span>
                      <div>
                        <p className="font-semibold text-slate-800">€2,500,000</p>
                        <p className="text-xs text-slate-500">Total Grant Allocated</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-icons text-slate-400">volunteer_activism</span>
                      <div>
                        <p className="font-semibold text-slate-800">45 Activities</p>
                        <p className="text-xs text-slate-500">Company Contribution Activities</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400">diversity_3</span>
                      <div>
                        <p className="font-semibold text-slate-800">12,500+</p>
                        <p className="text-xs text-slate-500">Number of Beneficiaries</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <a
                      className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700"
                      href="#"
                    >
                      Connect with Company
                    </a>
                    <a
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
                      href="#"
                    >
                      <span className="material-icons text-base">favorite_border</span>
                      Add to Wishlist
                    </a>
                  </div>
                  <div className="mt-6">
                    <h3 className="font-semibold text-slate-800">Industries</h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Information Technology
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Enterprise Software
                      </span>
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600">
                        Cloud Computing
                      </span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-900">Available Jobs</h3>
                  <div className="mt-4 space-y-4">
                    <div className="cursor-pointer rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md">
                      <h4 className="font-semibold text-slate-800">Senior UX Designer</h4>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-base">work</span>
                          <span>Full-time</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-base">location_on</span>
                          <span>Redmond, WA</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                          Design
                        </span>
                      </div>
                    </div>
                    <div className="cursor-pointer rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md dark:border-slate-800 dark:hover:border-slate-700">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">Cloud Solutions Architect</h4>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-base">work</span>
                          <span>Full-time</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-base">location_on</span>
                          <span>Remote</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                          Engineering
                        </span>
                      </div>
                    </div>
                    <div className="cursor-pointer rounded-lg border border-slate-200 p-4 transition-shadow hover:shadow-md dark:border-slate-800 dark:hover:border-slate-700">
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">AI/ML Product Manager</h4>
                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-500 dark:text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-base">work</span>
                          <span>Contract</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined !text-base">location_on</span>
                          <span>San Francisco, CA</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-600">
                          Product
                        </span>
                      </div>
                    </div>
                  </div>
                  <a className="mt-4 block w-full text-center text-sm font-semibold text-blue-600 hover:underline" href="#">
                    View all jobs
                  </a>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-2">
              <div className="border-b border-slate-200">
                <nav aria-label="Tabs" className="-mb-px flex space-x-6">
                  <a className="whitespace-nowrap border-b-2 border-blue-600 px-1 py-3 text-sm font-semibold text-blue-600" href="#">
                    About
                  </a>
                  <a
                    className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    href="#"
                  >
                    Capabilities
                  </a>
                  <a
                    className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    href="#"
                  >
                    Engagements
                  </a>
                  <a
                    className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    href="#"
                  >
                    Organization
                  </a>
                  <a
                    className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    href="#"
                  >
                    Talent
                  </a>
                  <a
                    className="whitespace-nowrap border-b-2 border-transparent px-1 py-3 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700"
                    href="#"
                  >
                    Reviews
                  </a>
                </nav>
              </div>
              <article className="prose prose-slate mt-8 max-w-none prose-p:text-slate-600 prose-headings:font-bold prose-headings:text-slate-900">
                <h2 className="text-3xl">About</h2>
                <p>
                  Tech Solutions Inc. is a global technology company dedicated to empowering every person and every organization on the planet to achieve more. Founded in 1975, we have pioneered software, cloud computing, and AI innovations that drive the digital transformation of businesses and individuals worldwide. From our flagship operating systems to our cloud platforms and AI-driven solutions, we continue to shape the future of work, security, and innovation.
                </p>
                <p>
                  With a commitment to sustainability, accessibility, and ethical AI, we strive to create technology that enhances productivity, fuels creativity, and connects the world. Our diverse ecosystem of products, services, and partners ensures that businesses of all sizes can thrive in an increasingly digital world.
                </p>
                <h3>CEO Quote</h3>
                <blockquote className="rounded-xl border-l-4 border-blue-600 bg-slate-50 p-6 text-slate-700">
                  <p className="font-medium">
                    "Our industry does not respect tradition—it only respects innovation. At Tech Solutions Inc., we are constantly pushing the boundaries of technology to build a future that is inclusive, intelligent, and empowering for all."
                  </p>
                </blockquote>
                <div className="mt-6">
                  <button className="flex items-center gap-1 text-sm font-semibold text-blue-600">
                    Show more
                    <span className="material-icons text-base">expand_more</span>
                  </button>
                </div>
                <div className="mt-12">
                  <h2 className="text-3xl">What we build</h2>
                  <p>Based on our impact gigs from the last 12 months, here is a breakdown of our top specializations we build for.</p>
                </div>
              </article>
              <div className="mt-12 space-y-12">
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-slate-900">Gallery</h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => scrollGallery("left")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        <span className="material-symbols-outlined">arrow_back</span>
                      </button>
                      <button
                        onClick={() => scrollGallery("right")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-4 overflow-hidden">
                    <div
                      ref={galleryScrollRef}
                      className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      <div className="aspect-[4/3] w-80 flex-shrink-0">
                        <Image
                          alt="Team working in an office"
                          className="h-full w-full rounded-xl object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAMvP6uBC3wGsJa0ea9_ob1xQBaBrjH1ENyv4DVnFiIoRJRE2vhF5mKMNyOEHWrxnU0YM0r4Al0UR2Q8kFt49RzBCuQA4bHfPAT9qBsgvcNO-tJKWLZ8_qwNf65Mgf2m1NQ1SsCMFwRbsg3QWuuNqv89rHjRPq4iXNVFwFuaBfvzE3JbPPzy1PPT0ZRSPgjsodKUcgeNGoZvKh9z1BLgTmgUURkGsX7T9efCbIVQJybTcDg4EY-ByNaRh6xsCEFd5G2w7m9iGk72mw"
                          width={400}
                          height={300}
                        />
                      </div>
                      <div className="aspect-[4/3] w-80 flex-shrink-0">
                        <Image
                          alt="Modern office interior"
                          className="h-full w-full rounded-xl object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuD3MDYi2a2ZOZ1-w-sh-vCXq_-I5oqTu75DwFy77X5iYMI1QkuzBVkonN8a6SGFpLlQUacYp1rTMB_u5ODupeeRKL2TYt6elNB1CDY0SDZKv3if2hhJO-bBsVeOpGMCf06nGF2CDR69DCOEE1k_0BA08Br7M4DWzNQRj3ZfR64v8eAHArUgsk5W6fcK1Jkypb_fMOLdfoAGuvIOu0V4ht9p_9KeqH2ksvvtBsnOFzpeNAemUgQ-l-OHm9IKXYcpXo2M_sTZm9waoRI"
                          width={400}
                          height={300}
                        />
                      </div>
                      <div className="aspect-[4/3] w-80 flex-shrink-0">
                        <Image
                          alt="Presentation in a meeting room"
                          className="h-full w-full rounded-xl object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBryXZWX77eD1a2iqfNmXzE8rqONBbQ5ukPNhBtm9_GGgX4vaXqYCo0QcuQ0QhGsu1DeD9MKG8hQjic_r-pvCLRQwJlKxVeZasAqyABKIE633g6gBHtVxrhRsSUctZDhebLuHJrKr-BXlwtrQWvK4K-tE1yVdU6LTOWrOHp3luYYhtOPRW-s7obC56APTIPXTOTin8wyUqdHGQ6AdI6p3H3TVJPGYj-SKQOaqCqivvNAw_WeT5A3Kjp-78w2bjERB0SQI7nfkq_0b8"
                          width={400}
                          height={300}
                        />
                      </div>
                      <div className="aspect-[4/3] w-80 flex-shrink-0">
                        <Image
                          alt="Team brainstorming session"
                          className="h-full w-full rounded-xl object-cover"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCrc_dbgbzHkmjDllV8QVpD899iNnVdFCxgRNTo-Mhu0fzXbGS5zdJlORU2cN35mmBqOI28rLFCA5-ShZLWYUx57UwtYZhzGIWHBqmGhwkyZvtPqZQSu_WBFlCvqTnUX_JYNuXKiW3E4g_90CCG5rWjM7_0-c6GP5cIwZ0fJkGGLY4SuAPzL--gOY81iTO-ndMgK-7VOZeHskzFBSRIZA0rfZkGyhf4v7FQNdLTRzrN_fEsdJGkljg7QFtb37J_gtNQZ-06CRuAhyk"
                          width={400}
                          height={300}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold text-slate-900">Sponsors</h2>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => scrollSponsors("left")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        <span className="material-symbols-outlined">arrow_back</span>
                      </button>
                      <button
                        onClick={() => scrollSponsors("right")}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-600 transition-colors hover:bg-slate-50"
                      >
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                  <div className="relative mt-4 overflow-hidden">
                    <div
                      ref={sponsorsScrollRef}
                      className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                      {[1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="flex h-24 w-40 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white p-4"
                        >
                          <Image
                            alt="Sponsor logo placeholder"
                            className="h-10 w-auto"
                            src={`https://lh3.googleusercontent.com/aida-public/AB6AXuBOfIY4KeY7PIZNj4F-b5b-1LKgYmD-TO1Nq7qXYdhfdt6TrwMNAM_iDJh1Y7tnM5_wpzpDgl6fmjo9bFz7vTZIL92y0H6m4NZiD5M_wCLh1waCiwJcdJGz7vPrZB3e90IbrZOv0jIRP3-JgbL6juqhTRZ3ftfVLQ9ARNiPSokko0Zu3ZbRoaqrpiOzAAVBMG-I4swexd5pGzBdvoRZ1Vek0p4RinmQfY8L_QeepyYiARumTsy4g2mPMAeuypl_s4RvYJYdiSk839c`}
                            width={40}
                            height={40}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-12">
                  <h2 className="mb-4 text-3xl font-bold text-slate-900">Our Location</h2>
                  <div className="relative h-96 w-full overflow-hidden rounded-xl">
                    <iframe
                      className="absolute left-0 top-0 h-full w-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689.479533325734!2d-122.143929484369!3d47.61633397918511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54906d713f333333%3A0x1e3a463a8e3d3e3e!2sMicrosoft%20Visitor%20Center!5e0!3m2!1sen!2sus!4v1678886412345"
                      title="Company Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <footer className="py-8"></footer>
      </div>
    </div>
  );
}

