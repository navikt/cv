import { BodyLong, BodyShort, Button, HStack, Link, Loader, Tag } from "@navikt/ds-react";
import { DelingTag } from "@/app/(minCV)/_components/delingAvCV/DelingTag";
import { PencilIcon } from "@navikt/aksel-icons";
import { useEures } from "@/app/_common/hooks/swr/useEures";
import { euresKategorier } from "@/app/_common/data/euresKategorier";
import styles from "../../../page.module.css";

function EuresLogoIcon() {
    return (
        <svg
            aria-hidden="true"
            width="50"
            height="56"
            viewBox="0 0 50 56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="eures_logo">
                <g id="eures_logo_2">
                    <path
                        id="Vector_1"
                        d="M18.5198 11.6909C18.0442 11.6909 17.7168 11.5038 17.5469 11.1357C17.39 10.7959 17.3284 10.3924 17.3627 9.93592C17.3878 9.49145 17.4641 8.9701 17.5883 8.3882L18.4501 4.12408H19.1724L18.3095 8.41874C18.0698 9.56508 18.1031 10.0357 18.1728 10.2282C18.2561 10.4791 18.4261 10.5996 18.6936 10.5996C18.9769 10.5996 19.2078 10.4715 19.4214 10.1966C19.6328 9.91465 19.8343 9.30058 20.0195 8.37293L20.8824 4.12354H21.6135L20.7419 8.43456C20.5529 9.33767 20.3687 9.97682 20.1797 10.3897C19.9798 10.8238 19.7472 11.1411 19.4677 11.3598C19.1833 11.5796 18.8652 11.6909 18.5198 11.6909Z"
                        fill="#224086"
                    />
                    <path
                        id="Vector_2"
                        d="M28.2121 11.5665H27.444L27.4876 9.52745C27.4952 9.20514 27.4527 8.94828 27.3574 8.74214C27.2446 8.51527 27.1193 8.48582 27.0234 8.48582H26.1992L25.5787 11.5665H24.8477L26.3501 4.12354H28.0982C28.4022 4.12354 28.6517 4.18516 28.8391 4.30787C29.0325 4.44039 29.1518 4.69616 29.197 5.06972C29.2471 5.42148 29.2243 5.83049 29.1289 6.28259C29.0271 6.80177 28.8669 7.22442 28.6408 7.57181C28.4414 7.87557 28.2235 8.08499 27.9779 8.20878C28.1598 8.43947 28.2453 8.86157 28.2377 9.48982L28.2121 11.5665ZM26.4193 7.39457H27.3792C27.6581 7.39457 27.8743 7.31277 28.022 7.15025C28.1789 6.9861 28.3053 6.67906 28.4 6.23515C28.4932 5.77541 28.472 5.45802 28.3374 5.29332C28.2579 5.19625 28.1337 5.14826 27.9582 5.14826H26.8774L26.4193 7.39457Z"
                        fill="#224086"
                    />
                    <path
                        id="Vector_3"
                        d="M36.2016 11.5665H33.1787L34.6893 4.12354H37.612L37.3919 5.21479H35.1916L34.7912 7.18788H36.8515L36.6303 8.27041H34.5793L34.1299 10.4835H36.4119L36.2016 11.5665Z"
                        fill="#224086"
                    />
                    <path
                        id="Vector_4"
                        d="M42.7487 11.6911C42.1696 11.6911 41.7828 11.4348 41.5981 10.9282C41.4238 10.4466 41.402 9.83583 41.5355 9.11215L41.5529 9.0178H42.2622L42.242 9.15087C42.1636 9.65968 42.1925 10.0354 42.327 10.2683C42.4638 10.4908 42.6506 10.5999 42.8979 10.5999C43.1496 10.5999 43.3572 10.5061 43.5516 10.3043C43.7516 10.096 43.8812 9.82983 43.9602 9.46499C44.0294 9.09524 44.0065 8.84056 43.8905 8.69004C43.799 8.57661 43.5925 8.39719 43.1404 8.19486C42.728 8.01053 42.4485 7.7444 42.3112 7.40464C42.1778 7.06543 42.1674 6.63515 42.2802 6.08762C42.4011 5.48391 42.6294 4.98382 42.9595 4.60316C43.2967 4.20342 43.6878 4 44.122 4C44.5872 4 44.9255 4.21432 45.1276 4.63697C45.3183 5.02799 45.3515 5.5728 45.2284 6.30412L45.2121 6.4001H44.4935L44.5132 6.26758C44.5872 5.77567 44.5469 5.43483 44.3917 5.25431C44.2974 5.1447 44.158 5.09125 43.9651 5.09125C43.7222 5.09125 43.5222 5.17687 43.3528 5.35411C43.1758 5.53899 43.0548 5.78767 42.9938 6.09198C42.9404 6.37556 42.9486 6.5708 43.02 6.6886C43.0761 6.77967 43.2155 6.92201 43.5653 7.08343C43.8758 7.22959 44.1193 7.37411 44.2925 7.51208C44.4772 7.66914 44.615 7.90528 44.7033 8.21613C44.791 8.52317 44.7834 8.93436 44.6804 9.43827C44.5431 10.0856 44.3051 10.6081 43.9537 11.0367C43.605 11.4648 43.1883 11.6911 42.7487 11.6911Z"
                        fill="#224086"
                    />
                    <path
                        id="Vector_5"
                        d="M11.5356 11.5782H8.5127L10.0233 4.13525H12.946L12.7264 5.22596H10.5256L10.1257 7.19905H12.1855L11.9648 8.28213H9.91328L9.46385 10.4946H11.7453L11.5356 11.5782Z"
                        fill="#224086"
                    />
                    <path
                        id="Vector_6"
                        d="M14.5905 34.8707C14.8634 34.6553 14.9712 34.4568 15.3597 34.8211L19.5374 39.3263C19.769 39.5744 19.7107 39.558 19.587 39.732C19.2149 40.1127 19.0166 40.2539 18.6773 40.5184C18.6277 40.5604 18.3793 40.7753 18.1641 40.568L13.9536 35.9887C13.6066 35.6489 13.6644 35.7318 13.8463 35.5333L14.5905 34.8707Z"
                        fill="#224086"
                    />
                    <path
                        id="Vector_7"
                        d="M8.83256 13.4307H43.2282L35.8576 49.5533H26.5847C33.5664 43.4753 33.1442 35.0534 28.8596 30.4239L18.0145 18.6399C16.7823 17.3894 16.7741 16.5201 14.8298 18.3999L14.168 19.212C11.8021 22.748 13.5976 25.5473 14.4578 26.7313L19.5202 32.1968C21.3234 33.8782 21.5135 37.099 20.1075 38.9958L15.7984 34.4159C15.2526 33.8198 14.9464 33.8198 14.2927 34.2588L13.4162 35.0785C13.292 35.1783 13.2424 35.2361 13.1264 35.1118L6.55764 27.9562C6.28471 27.6001 6.00362 27.6082 6.2188 26.1674L8.83256 13.4307Z"
                        fill="#224086"
                    />
                    <path
                        id="Vector_8"
                        d="M7.20344 29.7036L14.8219 37.9019L14.8138 37.9679L6.58296 33.5047C5.39974 32.6845 5.51577 30.3084 7.20344 29.7036Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_9"
                        d="M7.06292 34.5644L16.2198 39.417L17.9489 41.2886C17.9489 42.1999 17.0636 42.7213 16.1043 42.3984L5.22652 38.4899C2.92654 37.4963 4.0433 33.4715 7.06292 34.5644Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_10"
                        d="M7.78235 40.1628L17.1381 43.4922C18.2216 44.0719 18.056 46.1835 16.3111 46.1088L6.10285 44.2535C3.43135 43.1933 4.76274 39.0694 7.78235 40.1628Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_11"
                        d="M8.28741 45.396L17.1055 46.9115C18.4374 47.3582 17.9248 48.9566 16.9486 48.9484L9.16448 48.733C7.14614 48.2864 7.65876 45.6534 8.28741 45.396Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_12"
                        d="M14.7062 19.6748L18.6688 23.9646C20.0999 25.6295 20.4055 24.4281 21.6056 23.5839L28.5954 31.1027C37.3312 41.5037 23.3259 58.4969 9.79297 49.4211L16.4189 49.5864C18.3299 49.636 19.3061 47.8478 17.643 46.4233C18.5446 45.463 19.0572 44.4028 17.5934 42.9701C18.0565 42.5562 18.313 42.4815 18.6601 41.3968C22.2255 39.1276 22.5567 34.4653 20.4392 32.1792L15.1447 26.4906C13.3661 24.4859 13.317 21.4052 14.7062 19.6748Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_13"
                        d="M15.9963 18.2587C16.443 17.9937 16.4512 17.8279 16.8151 18.3416L20.9841 22.8877C21.2162 23.1358 21.1579 23.0448 20.9509 23.2771C20.5788 23.6577 20.5042 23.7243 20.1648 23.9893C20.0907 24.064 19.8254 24.2216 19.6108 24.0144L15.3921 19.4263C15.0528 19.0789 15.0778 19.1368 15.2516 18.9295C15.4586 18.7065 15.6324 18.5074 15.9963 18.2587Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_14"
                        d="M38.2984 21.2322L38.8111 20.8591H38.1742L37.9759 20.2549L37.7853 20.8591H37.1484L37.6611 21.2322L37.4628 21.8364L37.9759 21.4639L38.4886 21.8364L38.2984 21.2322Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_15"
                        d="M36.2965 19.3108L36.8096 18.9383H36.1723L35.9821 18.3335L35.7833 18.9383H35.1465L35.6596 19.3108L35.4614 19.9156L35.9821 19.5425L36.4953 19.9156L36.2965 19.3108Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_16"
                        d="M33.7149 18.6321L34.228 18.259H33.5907L33.4005 17.6548L33.2023 18.259H32.5654L33.078 18.6321L32.8879 19.2363L33.4005 18.8638L33.9137 19.2363L33.7149 18.6321Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_17"
                        d="M31.0025 19.3108L31.5152 18.9383H30.8783L30.68 18.3335L30.4894 18.9383H29.8525L30.3652 19.3108L30.1669 19.9156L30.68 19.5425L31.1927 19.9156L31.0025 19.3108Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_18"
                        d="M29.0582 21.3235L29.5714 20.951H28.934L28.7439 20.3462L28.5456 20.951H27.9082L28.4214 21.3235L28.2312 21.9277L28.7439 21.5552L29.257 21.9277L29.0582 21.3235Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_19"
                        d="M28.4371 23.9651L28.9503 23.5926H28.3211L28.1228 22.9878L27.9245 23.5926H27.2871L27.8003 23.9651L27.6102 24.5693L28.1228 24.1968L28.6359 24.5693L28.4371 23.9651Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_20"
                        d="M29.0754 26.6481L29.5962 26.2674H28.9594L28.7611 25.6626L28.5622 26.2674L27.9336 26.2756L28.4462 26.6481L28.2479 27.2523L28.7611 26.8798L29.2737 27.2523L29.0754 26.6481Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_21"
                        d="M31.0025 28.536L31.5152 28.163H30.8783L30.68 27.5669L30.4894 28.163H29.8525L30.3652 28.536L30.1669 29.1402L30.68 28.7683L31.1927 29.1402L31.0025 28.536Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_22"
                        d="M33.7149 29.2483L34.228 28.8758H33.5907L33.4005 28.271L33.2023 28.8758H32.5654L33.078 29.2483L32.8879 29.8525L33.4005 29.48L33.9137 29.8525L33.7149 29.2483Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_23"
                        d="M36.3629 28.5277L36.8755 28.1552H36.2387L36.0398 27.5586L35.8497 28.1552H35.2129L35.7255 28.5277L35.5272 29.1325L36.0398 28.7595L36.553 29.1325L36.3629 28.5277Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_24"
                        d="M38.2818 26.631L38.795 26.2503H38.1582L37.968 25.6455L37.7692 26.2503H37.1318L37.645 26.631L37.4549 27.2358L37.968 26.8546L38.4807 27.2358L38.2818 26.631Z"
                        fill="#FEE700"
                    />
                    <path
                        id="Vector_25"
                        d="M38.9928 23.9319L39.5059 23.5594H38.8691L38.6703 22.9546L38.4801 23.5594H37.8428L38.3559 23.9319L38.1571 24.5367L38.6703 24.1636L39.1834 24.5367L38.9928 23.9319Z"
                        fill="#FEE700"
                    />
                </g>
            </g>
        </svg>
    );
}

export default function Euresdeling() {
    const { eures, delerEures, euresLaster, euresHarFeil, initKategorier } = useEures();
    const kategorier = [];

    if (eures) {
        initKategorier.forEach((kategori) => {
            const e = euresKategorier.filter((i) => i.kategori === kategori)[0];
            if (e) {
                kategorier.push(e.kategoriTekst);
            }
        });
    }

    return (
        <>
            <HStack gap="3" align="center" className={[styles.mb3, styles.mt16]}>
                <EuresLogoIcon />
                <BodyShort size="small" weight="semibold">
                    Deling med EURES
                </BodyShort>
            </HStack>
            <BodyLong className={styles.mb5}>Den Europeiske Jobbmobilitetsportalen.</BodyLong>
            {euresLaster ? (
                <Loader size="medium" title="Laster..." />
            ) : (
                <>
                    {delerEures ? (
                        <>
                            <BodyLong className={styles.mb3} weight="semibold">
                                Dette deler du med Eures:
                            </BodyLong>
                            <HStack className={styles.mb3}>
                                {kategorier.map((valg) => (
                                    <Tag key={valg} className={styles.roundedTag} variant="neutral">
                                        {valg}
                                    </Tag>
                                ))}
                            </HStack>
                        </>
                    ) : (
                        <BodyLong className={styles.mb5}>
                            Du kan{" "}
                            <Link href="/min-cv/eures" inlineText>
                                lese mer om EURES eller endre status på deling her
                            </Link>
                            .
                        </BodyLong>
                    )}
                    <HStack gap="4" align="center">
                        <DelingTag
                            deltMed="EURES"
                            erDelt={delerEures}
                            laster={euresLaster}
                            error={euresHarFeil}
                            sistEndret={eures && eures.sistEndret}
                            erEures
                        />
                    </HStack>
                    {delerEures && (
                        <Button className={styles.mt10} icon={<PencilIcon aria-hidden />} as="a" href="/min-cv/eures">
                            Endre valg
                        </Button>
                    )}
                </>
            )}
        </>
    );
}
