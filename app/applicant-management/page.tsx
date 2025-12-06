"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

export default function ApplicantManagement() {
  const applicantIds = ["olivia", "liam", "ava", "noah", "emma"];
  const [selectedApplicants, setSelectedApplicants] = useState<Set<string>>(new Set(["olivia", "liam"]));

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedApplicants(new Set(applicantIds));
    } else {
      setSelectedApplicants(new Set());
    }
  };

  const handleApplicantToggle = (applicantId: string) => {
    const newSelected = new Set(selectedApplicants);
    if (newSelected.has(applicantId)) {
      newSelected.delete(applicantId);
    } else {
      newSelected.add(applicantId);
    }
    setSelectedApplicants(newSelected);
  };

  const isAllSelected = selectedApplicants.size === applicantIds.length;
  const selectedCount = selectedApplicants.size;

  return (
    <div className={`${inter.variable} font-sans bg-slate-50 text-gray-800 antialiased`}>
      <div className="flex h-screen overflow-hidden">
        <aside className="w-20 bg-white flex flex-col items-center py-6 space-y-6 flex-shrink-0 border-r border-gray-200">
          <div className="text-blue-600 font-bold text-2xl flex items-center justify-center">
            <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M13 10V3L4 14h7v7l9-11h-7z" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          <nav className="flex flex-col items-center space-y-2">
            <Link aria-label="Dashboard" className="p-3 bg-blue-600/10 text-blue-600 rounded-lg" href="#">
              <span className="material-icons-outlined">dashboard</span>
            </Link>
            <Link aria-label="Jobs" className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg" href="#">
              <span className="material-icons-outlined">work</span>
            </Link>
            <Link aria-label="Applicants" className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg" href="#">
              <span className="material-icons-outlined">people</span>
            </Link>
            <Link aria-label="Analytics" className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg" href="#">
              <span className="material-icons-outlined">analytics</span>
            </Link>
            <Link aria-label="Settings" className="p-3 text-gray-500 hover:bg-gray-100 rounded-lg" href="#">
              <span className="material-icons-outlined">settings</span>
            </Link>
          </nav>
          <div className="mt-auto">
            <Image
              alt="User profile picture of a man smiling"
              className="w-10 h-10 rounded-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyEBnrITmkeA4uWzSHWd0AiwvoNjp81B2HxBfHDCiHCHvF2eiMmd5flIZ6UJFeQIqyp-xneVZwuH2Y6pI8t1lGlkrMWb4EZoGPxkW3N1tnKjFkNQXFclDMNk2-nMoz3dexYMBpKqMAgLp7WkT-TSgzkWA1q8ZgdNtfqj38_L0AkWqmaRJF6hghBawP7Dgr5r4YJBVpVG_HE15MSrf4EaUsb8ws8jGL92XY7Ez0mBzc_VB3kMfpH96m7NZmc-4lCTpBEN5QQnVW8OA"
              width={40}
              height={40}
            />
          </div>
        </aside>
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">
            <header className="mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Community Garden Project - Applications</h1>
                  <p className="text-gray-500">Posted on October 15, 2024 • Deadline: November 15, 2024</p>
                </div>
                <div className="flex items-center gap-2 bg-green-100 text-green-600 px-3 py-1.5 rounded-full font-semibold">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Active</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-600/10 rounded-lg text-blue-600">
                      <span className="material-icons-outlined !text-2xl">description</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-900">124 / 200</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">
                      <span className="material-icons-outlined !text-2xl">pending</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Pending Review</p>
                      <p className="text-2xl font-bold text-gray-900">18</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-500/10 rounded-lg text-indigo-500">
                      <span className="material-icons-outlined !text-2xl">event</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Interviews Scheduled</p>
                      <p className="text-2xl font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </div>
              </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <div className="lg:col-span-1 xl:col-span-1 bg-white p-6 rounded-xl border border-gray-200 self-start">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                  <div className="flex items-start gap-3">
                    <Image
                      alt="Profile picture of Jane Doe"
                      className="w-10 h-10 rounded-full object-cover mt-1"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuDE965lcflzdRSkLsvFInRyewZLTIg8V25ZrCSJ4Bi_kga0WYb4-6h71v4MJgY2KVHVTd6lnKnNe5eRYya2uKBJdEoYlKHivOm09ucEZSxeN13fk2_Fd7SlBOjzTPvzSYXx3NtXTybOmZtOR3ugVYyaqdHwAqztdw_xWvl41oA8lJFmeDx95F0JrlN6Bnps0djSNTeotf5t28D66yk8neXYIBt1cO-kT1W-UO__q3-oJY9ipGNSINkk4qguzqeTag4c37GLaA7PxUw"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-800">Jane Doe</span> <span className="text-blue-600">applied</span>.
                      </p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      alt="Profile picture of John Smith"
                      className="w-10 h-10 rounded-full object-cover mt-1"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB7YgYO-zjshTj-oP1f3Qnq6XjNuSBlOqAQJSfNDiuTMldsanICtQohBJYq76gnaloAfxMz6t1NNpxgoQkH-ISzLjnJVfclVyGzHRGrRmuq75Hmkj923nbZPeZ7hymd9lTO0GAc8vVr780Qfa2BWtcgjyTZ6vVv_GZqX2s4KVmC5hmHaJke9JvQPaT8beGR90jJOnMu-Bw__-9FFqutiav_IF7x_RsPE89rE2IpdRY3puG7zlJXsJfPymbYszZc1dqvUNlDbHibp4M"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-800">John Smith</span> <span className="text-green-600">approved</span>.
                      </p>
                      <p className="text-xs text-gray-500">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      alt="Profile picture of Emily White"
                      className="w-10 h-10 rounded-full object-cover mt-1"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmIVfV_IW8kFqI26VfGVby8GdKSBUR-sSBjf4LbfUNFD5rLETBaJkLV7WwgXdQOFwr_w5QEwRI_xu2Qky4Rjj8NJ_38kQ8DIeYLEH4Gv_lEmh--CcG4r5DZq2dOjE5YbqdEl1atk8ndBFk-yisvSYdcO4FK5Pc3wNEF02fjvTnCfnsd-0q7OWZI8Jnch1rz_k3e7rQMu7UbBrkkXysWjq4mzMw2gjnqC0FvOqccN153n70-prAXbqq8UUWOHf-SgXPFlsiPRgH69o"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-800">Emily White</span> <span className="text-blue-600">applied</span>.
                      </p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      alt="Profile picture of Michael Brown"
                      className="w-10 h-10 rounded-full object-cover mt-1"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWhH12yMTmPjHkGnO2ZZYnNd4JU0StlrjNKo9j-NNeXtYSHgQUaj2XJp-KzZjNypeBK1UZS-YnXq0g0lCvtAVCPGoVglDqdTUtrtN5bv0edhsbR0paHVCk6vLQyJVkiSckIU4m-JtNJNp8XyAp0VQxo-P7K9L38E2U2z7JBH-r9VSyhqrnwWJJ4uCmxAEU00cZXUtZDWhAilvD10tm1oMbQXN6sqV7R79q7WCDkQGzNfA83a9FTFKFAIsl6zU7Qzm0-o86aWqVABQ"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-800">Michael Brown</span> <span className="text-purple-600">interview scheduled</span>.
                      </p>
                      <p className="text-xs text-gray-500">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Image
                      alt="Profile picture of Sarah Johnson"
                      className="w-10 h-10 rounded-full object-cover mt-1"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8SlpM05WD4xq7LwTCZ7tonGMqQgNTEMiBV7UDJoOirYZRn_C_Jgf1umnQ3nPXh3Z_5vhlxF7TDHShncsp-h7fhrOIIAmV-3_wJGQHW1Wuys-3YZPOj_VkYO2j1NVKsOzgT0JAGNeh42aNr6bfcpZ_bIqMvFecgjPElbSmtjGrSCtki8FnoxuSnrX0v3sneviwrRVbiJ37ENdEEIz3eKBlyIjVIo0pv2bZSuXtn1TI57dNVlS82QR6lJnQ43Ou05hNoTiX1vDG3oc"
                      width={40}
                      height={40}
                    />
                    <div>
                      <p className="text-sm">
                        <span className="font-semibold text-gray-800">Sarah Johnson</span> <span className="text-red-600">rejected</span>.
                      </p>
                      <p className="text-xs text-gray-500">2 days ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-2 xl:col-span-3">
                <div className="bg-white p-6 rounded-xl border border-gray-200">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
                    <div className="relative w-full md:w-auto">
                      <span className="material-icons-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                      <input
                        className="pl-10 w-full md:w-64 bg-slate-50 border-gray-300 rounded-lg focus:ring-blue-600 focus:border-blue-600"
                        placeholder="Search by name..."
                        type="text"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        All (124)
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Approved (45)
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-600/10 ring-1 ring-blue-600 rounded-lg">
                        Pending (18)
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                        Rejected (8)
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">{selectedCount} {selectedCount === 1 ? "item" : "items"} selected</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm">
                        <span className="material-icons-outlined text-base">check_circle</span>
                        Approve Selected
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 shadow-sm">
                        <span className="material-icons-outlined text-base">download</span>
                        Export Data
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 shadow-sm">
                        <span className="material-icons-outlined text-base">event</span>
                        Schedule Interview
                      </button>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="text-xs text-gray-500 uppercase bg-slate-50">
                        <tr>
                          <th className="p-4" scope="col">
                            <input
                              checked={isAllSelected}
                              onChange={handleSelectAll}
                              className="rounded border-gray-400 bg-transparent focus:ring-blue-600 text-blue-600 cursor-pointer"
                              type="checkbox"
                            />
                          </th>
                          <th className="py-3 px-6" scope="col">
                            Applicant
                          </th>
                          <th className="py-3 px-6" scope="col">
                            Applied Date
                          </th>
                          <th className="py-3 px-6" scope="col">
                            Experience
                          </th>
                          <th className="py-3 px-6" scope="col">
                            Status
                          </th>
                          <th className="py-3 px-6" scope="col">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4">
                            <input
                              checked={selectedApplicants.has("olivia")}
                              onChange={() => handleApplicantToggle("olivia")}
                              className="rounded border-gray-400 bg-transparent focus:ring-blue-600 text-blue-600 cursor-pointer"
                              type="checkbox"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <Image
                                alt="Profile picture of Olivia Martin"
                                className="w-8 h-8 rounded-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9OinG9p1wQ-S7L_w3SQ_ssNAFgbX1_fNjA5Xu45MAumWGBOqzRhpgDpnohB5f8bRD-gT34LDMa3Uz0OgOwCI2JMiAKtOvrRoWerFhfp4Am8uncunjUcQrQ7OVIKZlh5NcvhzYFlyiJyt6fBOTVPIsTYG6Q7r1Gus_fY_teXK6esQj-3oYOKtq4dfBoKXnYUWyf5N0l-2_PqzOJdNiPPNXl2hmdj41m-gr6phKCNrqkrGnARqUYMkNAc0pnuAEF_VYy5s7WD9oOvY"
                                width={32}
                                height={32}
                              />
                              <div>
                                <div className="font-medium text-gray-900">Olivia Martin</div>
                                <div className="text-xs text-gray-500">Tech University</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">Oct 20, 2024</td>
                          <td className="py-4 px-6">2 years</td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button className="text-blue-600 hover:underline font-semibold">Review</button>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4">
                            <input
                              checked={selectedApplicants.has("liam")}
                              onChange={() => handleApplicantToggle("liam")}
                              className="rounded border-gray-400 bg-transparent focus:ring-blue-600 text-blue-600 cursor-pointer"
                              type="checkbox"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <Image
                                alt="Profile picture of Liam Garcia"
                                className="w-8 h-8 rounded-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9lzs7d4FidZXIO_cggMPVAWW6r08BnGMRa5s8R6YoawDQLRRPNgRjDUm-ot-r75V5RSseBNhxASlqi1R9sklSnOpK2F7zUdftGrHeu1RVhmJQ-y8vJyTmC_ISP20nGVVusaS-QuSXUDj-ZexOfIc1R2hg9JSCKTMZmBtdXYL4HO7FbVSnPeKzY45g8-MtaxFybK8hZ6RpieJbjbJzzlaGAAjd58uhOtrlkzCVEXWupmGfmBK2-HDWzbFM_grvRhGuoBU-fR41Q3Y"
                                width={32}
                                height={32}
                              />
                              <div>
                                <div className="font-medium text-gray-900">Liam Garcia</div>
                                <div className="text-xs text-gray-500">State College</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">Oct 19, 2024</td>
                          <td className="py-4 px-6">1 year</td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                              Pending
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button className="text-blue-600 hover:underline font-semibold">Review</button>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4">
                            <input
                              checked={selectedApplicants.has("ava")}
                              onChange={() => handleApplicantToggle("ava")}
                              className="rounded border-gray-400 bg-transparent focus:ring-blue-600 text-blue-600 cursor-pointer"
                              type="checkbox"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <Image
                                alt="Profile picture of Ava Wilson"
                                className="w-8 h-8 rounded-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXWDVGUVGRdpMfX9lBDI4FGywXg9fWxpy4msDWYL_7q15w1x2wQZroBYgBeagPPSi92qBw1wnI_HpnHyKrDaCWVO4Ef4JW9dD4vdZdBYLaror2iSFknDn2I9LzUqZc2bh96rLzdFYUBfDFpiN-YATf4wZkA-DnloNgTt12gOn34oAbBEqRFkfcO95CQh72gH-LNJu1JHq7Yuh-AYC50zXMlIEkcDsaiO3qSTXa7fOcuFGQfzRGTAJ2a0hKmAg4YhIqnDKOt7U8lTI"
                                width={32}
                                height={32}
                              />
                              <div>
                                <div className="font-medium text-gray-900">Ava Wilson</div>
                                <div className="text-xs text-gray-500">Metro University</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">Oct 18, 2024</td>
                          <td className="py-4 px-6">3 years</td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
                              Rejected
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button className="text-blue-600 hover:underline font-semibold">View</button>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-200 hover:bg-gray-50">
                          <td className="p-4">
                            <input
                              checked={selectedApplicants.has("noah")}
                              onChange={() => handleApplicantToggle("noah")}
                              className="rounded border-gray-400 bg-transparent focus:ring-blue-600 text-blue-600 cursor-pointer"
                              type="checkbox"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <Image
                                alt="Profile picture of Noah Martinez"
                                className="w-8 h-8 rounded-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcVB47fwgibW7f3lztq03wBB_x7S-SS5QS2n3ezD8OrdhglRpx3He_Zn5GYnDyjA5w0R8kbbCtMpmSDmyMC6jt8zIu-JPvN3q-A5t4ddqn0BbWH22140maNQ-Iy_P6gTn-tbQzYdb3LYXyHXlmikRwVLmvtWoRAuY1YQiKFbkxpAA7Hy3nzb4i-s5Ol_I3JuoBdgd1zANbadDvkrlvIBAoXHk7dU3MjpcwBudt6RyElMyRFM4WpB2G8CVB3Y1MHbuXX33J3viX0vM"
                                width={32}
                                height={32}
                              />
                              <div>
                                <div className="font-medium text-gray-900">Noah Martinez</div>
                                <div className="text-xs text-gray-500">City Institute</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">Oct 17, 2024</td>
                          <td className="py-4 px-6">4 years</td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                              Approved
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="material-icons-outlined text-gray-400">more_horiz</span>
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50">
                          <td className="p-4">
                            <input
                              checked={selectedApplicants.has("emma")}
                              onChange={() => handleApplicantToggle("emma")}
                              className="rounded border-gray-400 bg-transparent focus:ring-blue-600 text-blue-600 cursor-pointer"
                              type="checkbox"
                            />
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <Image
                                alt="Profile picture of Emma Lee"
                                className="w-8 h-8 rounded-full object-cover"
                                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAp19yWUDDd-8f6t2DkH67UO3u3lvESIZlAHCQY8Bo4OGapPWrnnJwx1XiJhfdMNuf6aeGwEw3jBh0cSOsQ5OwzZ8bX4W-hVjvPHunPi-CsVQx_74jBunZc_2sUyUqrC2HsRRNGxliGX8BKbSSWI4hx6bMKsMrBBksYOtLuDXSClx6k3WXcgdr8a87WxmxQBO71cGlGi7bGxVafnqYGoBDIRlyWDPXaJJqv3L8GaFLmR880T4GO3X7zPtICU0ZLLhpaU1Pf8KktXIo"
                                width={32}
                                height={32}
                              />
                              <div>
                                <div className="font-medium text-gray-900">Emma Lee</div>
                                <div className="text-xs text-gray-500">Tech University</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-6">Oct 16, 2024</td>
                          <td className="py-4 px-6">1.5 years</td>
                          <td className="py-4 px-6">
                            <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                              Interview Scheduled
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="material-icons-outlined text-gray-400">more_horiz</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

