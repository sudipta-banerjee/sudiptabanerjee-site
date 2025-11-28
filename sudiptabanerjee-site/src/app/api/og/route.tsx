import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
    return new ImageResponse(
        (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
                    padding: '80px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        fontSize: 40,
                        color: '#94a3b8',
                        marginBottom: 20,
                        fontWeight: 700,
                    }}
                >
                    SUDIPTABANERJEE.COM
                </div>
                <div
                    style={{
                        fontSize: 60,
                        fontWeight: 900,
                        color: 'white',
                        lineHeight: 1.2,
                        marginBottom: 40,
                        maxWidth: '80%',
                    }}
                >
                    Bridging the gap between complex technology and strategic leadership
                </div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'white',
                        color: '#0f172a',
                        padding: '15px 40px',
                        borderRadius: '50px',
                        fontSize: 24,
                        fontWeight: 600,
                    }}
                >
                    Read More
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        },
    );
}
