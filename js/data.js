// Structure: topics > sections > videos.
// The order written here is the order shown on the page (nothing is re-sorted), so keep each list sorted by title yourself.
// A section needs a title and a videos list. An empty list shows "Coming soon".
// Video: title + ready ("Y" to publish, "N" to hide) + youtube (any YouTube link) + lang.
// Local files instead: video + subtitle (.srt) + label.  thumbnail is optional.
// For YouTube videos upload the .srt to YouTube Studio as captions.
const SITE = {
  topics: [
    {
      id: "dse",
      name: "DSE",
      description: "HKDSE Mathematics, past paper walkthroughs and key concepts.",
      sections: [
        {
          title: "DSE - Differentiation",
          videos: [
            {
              title: "D01: Concepts and Overview",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=axx6i26suQw&t=5s",
              lang: "zh-HK"
            },
            {
              title: "D02: Power Rule",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=-KoSK3Yd3qE&t=67s",
              lang: "zh-HK"
            },
            {
              title: "D03: Basic Differentiation",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=iUZ0WBYT-4U&t=16s",
              lang: "zh-HK"
            }
          ]
        },
        {
          title: "DSE - Coordinate Geometry",
          videos: [
            {
              title: "G01: 2 Points Form",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=bGZRuqc1SqM&t=18s",
              lang: "zh-HK"
            },
            {
              title: "G02: Midpoint",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=iEqzmh5MYqM&t=5s",
              lang: "zh-HK"
            },
            {
              title: "G03: Midpoint",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=jxNfT9v4-TE&t=81s",
              lang: "zh-HK"
            },
            {
              title: "G04: Linear line",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=Lwz_upyTBXk&t=3s",
              lang: "zh-HK"
            },
            {
              title: "G05: 2 points form + perpendicular line",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=pc1-yjCoVhg&t=119s",
              lang: "zh-HK"
            }
          ]
        }
      ]
    },
    {
      id: "olympiad",
      name: "Olympiad",
      description: "Competition problems and proof techniques.",
      sections: [
        {
          title: "P1-P3",
          videos: [
            {
              title: "P001: Missing Number",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=IXJ9yK_p1Ow",
              lang: "zh-HK"
            },
            {
              title: "P002: Repeat Pattern",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=8C-hZoqBP9E&t=28s",
              lang: "zh-HK"
            },
            {
              title: "P003: Missing Number",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=2KEV78wAy4s",
              lang: "zh-HK"
            },
            {
              title: "P004: Calendar",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=VOCfGjpx4cM&t=44s",
              lang: "zh-HK"
            },
            {
              title: "P005: Operation Symbol",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=ylzbzaunMfQ",
              lang: "zh-HK"
            }
          ]
        },
        {
          title: "P4-P6",
          videos: [
            {
              title: "P006: Missing Number",
              ready: "N",
              youtube: "https://www.youtube.com/watch?v=MEmT0SMB9vAxxx",
              lang: "zh-HK"
            },
            {
              title: "P007: Age",
              ready: "N",
              youtube: "https://www.youtube.com/watch?v=6vPw8jZHLUIxxx",
              lang: "zh-HK"
            },
            {
              title: "P008: Unit Digit",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=QBswoK-i1Bs",
              lang: "zh-HK"
            },
            {
              title: "P009: Consecutive Numbers",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=5fd9_EtY41w",
              lang: "zh-HK"
            },
            {
              title: "P010: Fibonacci Pattern",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=3fleLFzgeVI",
              lang: "zh-HK"
            },
            {
              title: "P011: Pigeonhole Principle",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=gI_BmD_s_L0",
              lang: "zh-HK"
            },
            {
              title: "P012: Working Backwards",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=Y0SjGDqaitU",
              lang: "zh-HK"
            },
            {
              title: "P013: Operation Symbol",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P014: Consecutive Numbers",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P015: Ratio and Proportion",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P016: Integral Solutions",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P017: Infinitive Expression",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P018: Integer Solutions",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P019: Integer Solutions",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P020: 3D Geometry",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            },
            {
              title: "P021: Permutations",
              ready: "N",
              youtube: "xxx",
              lang: "zh-HK"
            }


          ]
        }
      ]
    },
    {
      id: "misc",
      name: "Misc",
      description: "Various Math topics and problems.",
      sections: [
        {
          title: "S1 - S3: Geometry",
          videos: [
            {
              title: "M001: Triangle Area & Square",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=OzOg4SaX5c4&t=107s",
              lang: "zh-HK"
            },
            {
              title: "M002: Funny Math",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=8q-10XUbp6c&t=96s",
              lang: "zh-HK"
            },
            {
              title: "M003: Funny Math",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=J7PB072qegI&t=81s",
              lang: "zh-HK"
            },
            {
              title: "M004: Triangle Angle",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=8MbzFKEN8hk&t=5s",
              lang: "zh-HK"
            },
            {
              title: "M005: Triangle Area",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=-wG1nvQ7xAY&t=4s",
              lang: "zh-HK"
            },
            {
              title: "M006: Triangle Area",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=eF9n9qCMQy4&t=5s",
              lang: "zh-HK"
            },
            {
              title: "M007: Triangle Area",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=cqt28JNVWdg&t=7s",
              lang: "zh-HK"
            },
            {
              title: "M012: Polygon Area",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=LEgvrBACEgo&t=195s",
              lang: "zh-HK"
            },
            {
              title: "M013: Triangle Area",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=TCdCVUqoYPs&t=64s",
              lang: "zh-HK"
            },
            {
              title: "M014: Triangle Angle",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=fMcppuE9-js&t=8s",
              lang: "zh-HK"
            },
            {
              title: "M015: Triangle Angle",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=lk8PE7WP7LY",
              lang: "zh-HK"
            }
          ]
        },
        {
          title: "S1 - S3: Others",
          videos: [
            {
              title: "M008: Fraction Decomposition",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=PMaQVfOJ9HE&t=3s",
              lang: "zh-HK"
            },
            {
              title: "M009: Fractional Algebraic Equation",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=w-qT-6ByCbw&t=5s",
              lang: "zh-HK"
            },
            {
              title: "M010: Telescoping identity",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=wHGpYXMLvxQ&t=22s",
              lang: "zh-HK"
            },
            {
              title: "M011: Rational Equation",
              ready: "Y",
              youtube: "https://www.youtube.com/watch?v=vl1vxrvX_po&t=30s",
              lang: "zh-HK"
            }

          ]
        }
      ]
    }
  ]
};
