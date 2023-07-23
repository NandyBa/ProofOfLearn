import styles from "./PageAPEExperience.module.css";
import React, { useState, useEffect } from "react";

const PageAPEExperience = () => {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [price, setPrice] = useState(0);
  const [volume, setVolume] = useState(0);

  const api_url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=apecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";

  useEffect(() => {
    // getApeCoinData();
  }, []);

  const getApeCoinData = async () => {
    const response = await fetch(api_url);
    const data = await response.json();
    const price = data[0].current_price;
    const volume = data[0].total_volume;
    setPrice(price);
    setVolume(volume);
  };

  const questions = [
    {
      text: "On which blockchain ApeCoin was created?",
      options: [
        { id: 0, text: "Bitcoin", isCorrect: false },
        { id: 1, text: "Polygon", isCorrect: false },
        { id: 2, text: "Solana", isCorrect: false },
        { id: 3, text: "Ethereum", isCorrect: true },
      ],
    },
    {
      text: "What is the ApeCoin symbol?",
      options: [
        { id: 0, text: "APE", isCorrect: true },
        { id: 1, text: "APY", isCorrect: false },
        { id: 2, text: "APC", isCorrect: false },
        { id: 3, text: "ACOIN", isCorrect: false },
      ],
    },
    {
      text: "What is one of the main uses of ApeCoin?",
      options: [
        { id: 0, text: "Used as currency in the Bored Ape Yacht Club (BAYC) ecosystem", isCorrect: true },
        { id: 1, text: "Used to purchase virtual real estate in Decentraland", isCorrect: false },
        { id: 2, text: "Used for transactions on the Compound lending platform", isCorrect: false },
        { id: 3, text: "Used for transaction fees on the Ethereum blockchain", isCorrect: false },
      ],
    },
    {
      text: "What is the trading volume of ApeCoin in the last 24 hours?",
      options: [
        { id: 0, text: (volume * 2).toString() + " $", isCorrect: false },
        { id: 1, text: (volume + volume / 2).toString() + " $", isCorrect: false },
        { id: 2, text: volume.toString() + " $", isCorrect: true },
        { id: 3, text: (volume - volume / 2).toString() + " $", isCorrect: false },
      ],
    },
    {
      text: "What is the current value of an ApeCoin?",
      options: [
        { id: 0, text: (price * 3).toString() + " $", isCorrect: false },
        { id: 1, text: (price * 2).toString() + " $", isCorrect: false },
        { id: 2, text: (price / 2).toString() + " $", isCorrect: false },
        { id: 3, text: price.toString() + " $", isCorrect: true },
      ],
    },
  ];

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (isCorrect) => {
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className={styles.pageApeExperience}>
      <div className={styles.divcss1y21ojc}>
        <div className={styles.divcssSdkmul}>
          <div className={styles.divchakraStack}>
            <img className={styles.divchakraStackChild} alt="" src="/ellipse-1@2x.png" />
            <div className={styles.divcss1uod83n} />
          </div>
          <div className={styles.divchakraStack1}>
            <div className={styles.buttonHelp}>
              <div className={styles.svg}>
                <div className={styles.frame}>
                  <img className={styles.vectorIcon} alt="" src="/vector.svg" />
                </div>
              </div>
            </div>
            <div className={styles.divcss0}>
              <div className={styles.button}>
                <div className={styles.spanchakraButtonIcon}>
                  <div className={styles.span}>
                    <div className={styles.image}>
                      <div className={styles.image1} />
                    </div>
                    <div className={styles.wallet2f170466svg}>
                      <img className={styles.wallet2f170466svgIcon} alt="" src="/wallet2f170466svg.svg" />
                    </div>
                  </div>
                </div>
                <div className={styles.pchakraText}>
                  <div className={styles.id01027}>ID : 01027</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divcssFk4jif}>
          <div className={styles.divchakraStack2}>
            <div className={styles.divchakraStack3}>
              <div className={styles.divchakraStack4}>
                <div className={styles.divchakraStack5}>
                  <div className={styles.span1}>
                    <div className={styles.image2}>
                      <div className={styles.image3} />
                    </div>
                    <img className={styles.mirror938c2527pngIcon} alt="" src="/mirror938c2527png@2x.png" />
                  </div>
                  <div className={styles.pchakraText1}>
                    <div className={styles.apecoinFind}>{`ApeCoin / Find the right information  `}</div>
                  </div>
                </div>
                <div className={styles.pchakraText2}>
                  <b className={styles.treasureHunt}>Treasure hunt : Find the good data</b>
                </div>
              </div>
              <div className={styles.divchakraStack6}>
                <div className={styles.divchakraStack7}>
                  <div className={styles.divchakraStack8}>
                    <div className={styles.divcssGo2wv}>
                      <div className={styles.svg1}>
                        <div className={styles.frame1}>
                          <img className={styles.vectorIcon1} alt="" src="/vector1.svg" />
                        </div>
                      </div>
                    </div>
                    <div className={styles.pchakraText3}>
                      <div className={styles.ape}>500 APE</div>
                    </div>
                  </div>
                  <div className={styles.divcssDga45d}>
                    <div className={styles.span2}>
                      <div className={styles.image2}>
                        <div className={styles.image3} />
                      </div>
                      <div className={styles.optimism202c83a8png} />
                    </div>
                  </div>
                </div>
                <div className={styles.divchakraStack9}>
                  <div className={styles.divchakraStack10}>
                    <div className={styles.svg1}>
                      <div className={styles.frame2}>
                        <img className={styles.vectorIcon2} alt="" src="/vector2.svg" />
                      </div>
                    </div>
                    <div className={styles.pchakraText4}>
                      <div className={styles.ape}>Challenge</div>
                    </div>
                  </div>
                  <div className={styles.pchakraText5}>
                    <div className={styles.findTheRight}>Find the right data and learn DYOR</div>
                  </div>
                </div>
                <div className={styles.divchakraStack11}>
                  <div className={styles.divchakraStack12}>
                    <div className={styles.svg1}>
                      <div className={styles.frame3}>
                        <img className={styles.vectorIcon3} alt="" src="/vector3.svg" />
                      </div>
                    </div>
                    <div className={styles.pchakraText6}>
                      <div className={styles.ape}>Difficulté</div>
                    </div>
                  </div>
                  <div className={styles.pchakraText7}>
                    <div className={styles.facile}>Facile</div>
                  </div>
                </div>
                <div className={styles.divchakraStack13}>
                  <div className={styles.divchakraStack14}>
                    <div className={styles.svg1}>
                      <div className={styles.frame4}>
                        <img className={styles.vectorIcon4} alt="" src="/vector4.svg" />
                      </div>
                    </div>
                    <div className={styles.pchakraText8}>
                      <div className={styles.ape}>Claimed</div>
                    </div>
                  </div>
                  <div className={styles.pchakraText9}>
                    <div className={styles.findTheRight}>500 APE to share</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.divchakraStack15}>
              <div className={styles.divchakraStack16}>
                <div className={styles.svg5}>
                  <div className={styles.frame5}>
                    <img className={styles.vectorIcon5} alt="" src="/vector5.svg" />
                  </div>
                </div>
                <div className={styles.pchakraText10}>
                  <div className={styles.questions}>Questions</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.divchakraStack17}>
            <div className={styles.divchakraStack18}>
              <div className={styles.svg6}>
                <div className={styles.frame6} />
              </div>
              <img className={styles.vectorIcon6} alt="" src="/vector6.svg" />
              <div className={styles.stepByStepContainer}>
                <p className={styles.stepByStep}>Step by Step</p>
              </div>
              <div className={styles.pchakraText11} />
            </div>
            <div className={styles.pchakraText12}>
              <img className={styles.pchakraTextChild} alt="" src="/rectangle-6@2x.png" />
              <div className={styles.step1DyorContainer}>
                <span className={styles.step1DyorContainer1}>
                  <p className={styles.stepByStep}>
                    Step 1: DYOR on APE Coin: Suppose you are interested in a specific DAO like APE Coin. Start by
                    performing extensive research on the project. Visit their official website, read the whitepaper, and
                    analyze the team members' backgrounds. Investigate the project's use case, technology, and community
                    engagement. Look for reviews and discussions on forums or social media platforms.
                  </p>
                  <p className={styles.stepByStep}>&nbsp;</p>
                  <p className={styles.stepByStep}>
                    Step 2: Use Data Aggregation Platforms: To find relevant data about APE Coin, use data aggregation
                    platforms like CoinMarketCap, CoinGecko, or other similar sites. These platforms provide real-time
                    data on the coin's price, market capitalization, trading volume, and other relevant metrics.
                    Analyzing this data will help you make more informed decisions.
                  </p>
                  <p className={styles.stepByStep}>&nbsp;</p>
                  <p className={styles.stepByStep}>
                    Step 3: Participating in DAOs and earning governance tokens can be an exciting and rewarding
                    experience. Remember to always perform thorough research (DYOR) and use reliable data sources to
                    make informed decisions. Good luck on your journey to earning your first governance token!
                  </p>
                </span>
              </div>
            </div>
          </div>
          <div className={styles.divchakraStack19}>
            <div className={styles.divchakraStack20}>
              <div className={styles.pchakraText13}>
                <div className={styles.apecoinDao}>APEcoin DAO</div>
              </div>
              <div className={styles.divchakraStack21}>
                <div className={styles.svg1}>
                  <div className={styles.frame7}>
                    <img className={styles.vectorIcon7} alt="" src="/vector7.svg" />
                  </div>
                </div>
                <div className={styles.pchakraText14}>
                  <div className={styles.claimIssueReport}>Claim Issue Report</div>
                </div>
              </div>
              <div className={styles.divcss1u95mlq}>
                <div className={styles.span3}>
                  <img
                    className={styles.j7jl0vs06s3deq80ehhnelx1rq2fazIcon}
                    alt=""
                    src="/j7jl0vs06s3deq80ehhnelx1rq2faztdzzb0na7qahk@2x.png"
                  />
                </div>
              </div>
            </div>
            <div className={styles.divchakraStack22}>
              <div className={styles.divchakraStack23}>
                <div className={styles.pchakraText15}>
                  <div className={styles.questions}>Achieved Accounts</div>
                </div>
                <div className={styles.divcss1ee2lil} />
                <div className={styles.span4}>
                  <div className={styles.image2}>
                    <div className={styles.image3} />
                  </div>
                  <div className={styles.dottyGray418199d2svg}>
                    <div className={styles.dottyGray418199d2svg1}>
                      <img className={styles.vectorIcon8} alt="" src="/vector8.svg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.divchakraStack24}>
                <div className={styles.divchakraStack25}>
                  <div className={styles.divcss01}>
                    <div className={styles.divcss1y1nkkn}>
                      <div className={styles.span3}>
                        <img className={styles.haoxiaoethIcon} alt="" src="/haoxiaoeth@2x.png" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.pchakraText16}>
                    <div className={styles.apecoinDao}>haoxiao.eth</div>
                  </div>
                </div>
                <div className={styles.divchakraStack25}>
                  <div className={styles.divcss01}>
                    <div className={styles.divcss1y1nkkn}>
                      <div className={styles.span3}>
                        <img className={styles.haoxiaoethIcon} alt="" src="/mo115eth@2x.png" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.pchakraText17}>
                    <div className={styles.apecoinDao}>mo115.eth</div>
                  </div>
                </div>
                <div className={styles.divchakraStack25}>
                  <div className={styles.divcss01}>
                    <div className={styles.divcss1y1nkkn}>
                      <div className={styles.span3}>
                        <img className={styles.haoxiaoethIcon} alt="" src="/neparaeth@2x.png" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.pchakraText18}>
                    <div className={styles.apecoinDao}>nepara.eth</div>
                  </div>
                </div>
                <div className={styles.divchakraStack25}>
                  <div className={styles.divcss01}>
                    <div className={styles.divcss1y1nkkn}>
                      <div className={styles.span3}>
                        <img className={styles.haoxiaoethIcon} alt="" src="/0x68159eth@2x.png" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.pchakraText19}>
                    <div className={styles.apecoinDao}>0x68159.eth</div>
                  </div>
                </div>
                <div className={styles.divchakraStack25}>
                  <div className={styles.divcss01}>
                    <div className={styles.divcss1y1nkkn}>
                      <div className={styles.span3}>
                        <img className={styles.haoxiaoethIcon} alt="" src="/truete11ereth@2x.png" />
                      </div>
                    </div>
                  </div>
                  <div className={styles.pchakraText20}>
                    <div className={styles.apecoinDao}>truete11er.eth</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.divcssJkl58t}>
          <div className={styles.divchakraStack30}>
            <div className={styles.pchakraText21}>
              <b className={styles.backToAll}>Back to all experiences</b>
            </div>
            <div className={styles.button1}>
              <div className={styles.svg5}>
                <div className={styles.frame8}>
                  <img className={styles.vectorIcon9} alt="" src="/vector9.svg" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.divcssY0pad}>
        <div className={styles.divchakraStack31}>
          <div className={styles.divchakraStack32}>
            <div className={styles.button2}>
              <div className={styles.spanchakraButtonIcon1}>
                <div className={styles.svg5}>
                  <div className={styles.frame9}>
                    <img className={styles.vectorIcon10} alt="" src="/vector10.svg" />
                  </div>
                </div>
              </div>
              <div className={styles.divcssE03czl}>
                <div className={styles.pchakraText22}>
                  <div className={styles.apecoinDao}>Notifications</div>
                </div>
                <div className={styles.divchakraStack33}>
                  <div className={styles.divcssGo2wv1}>
                    <div className={styles.divcss1ldmaet} />
                  </div>
                  <div className={styles.pchakraText23}>
                    <div className={styles.ape}>1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.button3}>
            <div className={styles.divcss0}>
              <div className={styles.svg5}>
                <div className={styles.frame10}>
                  <img className={styles.vectorIcon11} alt="" src="/vector11.svg" />
                </div>
              </div>
            </div>
            <div className={styles.pchakraText24}>
              <div className={styles.home}>Home</div>
            </div>
          </div>
          <div className={styles.divchakraStack34}>
            <div className={styles.button4}>
              <div className={styles.divcss0}>
                <div className={styles.svg5}>
                  <div className={styles.frame11}>
                    <img className={styles.vectorIcon12} alt="" src="/vector12.svg" />
                  </div>
                </div>
              </div>
              <div className={styles.pchakraText25}>
                <div className={styles.level}>Level</div>
              </div>
            </div>
            <div className={styles.button5}>
              <div className={styles.divcss0}>
                <div className={styles.svg5}>
                  <div className={styles.frame12}>
                    <img className={styles.vectorIcon13} alt="" src="/vector13.svg" />
                  </div>
                </div>
              </div>
              <div className={styles.pchakraText26}>
                <div className={styles.experience}>Experience</div>
              </div>
            </div>
          </div>
          <div className={styles.divchakraStack35}>
            <div className={styles.pchakraText27}>
              <div className={styles.ape}>Account</div>
            </div>
            <div className={styles.button6}>
              <div className={styles.divcss0}>
                <div className={styles.svg5}>
                  <div className={styles.frame13}>
                    <img className={styles.vectorIcon10} alt="" src="/vector14.svg" />
                  </div>
                </div>
              </div>
              <div className={styles.pchakraText28}>
                <div className={styles.account1}>Account</div>
              </div>
            </div>
          </div>
          <div className={styles.divchakraStack35}>
            <div className={styles.pchakraText29}>
              <div className={styles.ape}>Resources</div>
            </div>
            <div className={styles.button7}>
              <div className={styles.divcss0}>
                <div className={styles.svg5}>
                  <div className={styles.frame14}>
                    <img className={styles.vectorIcon15} alt="" src="/vector15.svg" />
                  </div>
                </div>
              </div>
              <div className={styles.pchakraText30}>
                <div className={styles.links}>Links</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageAPEExperience;
