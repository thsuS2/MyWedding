import { VENUE, ACCOUNTS } from '../../constants/wedding';
import { PiGiftFill, PiFlower } from 'react-icons/pi';
import { Button } from '../buttons';
import { AccountCard } from '../cards';

export default function CelebrationSection({ onOpenRSVP }) {
    return (
        <section id="celebration" className="celebration-section">
            {/* 계좌번호 */}
            <div className="account-section fade-in">
                <h3>
                    <PiGiftFill size={20} style={{ verticalAlign: 'middle', marginRight: '8px' }} />
                    마음 전하실 곳
                </h3>
                <div className="account-list">
                    {ACCOUNTS.map((account) => (
                        <AccountCard
                            key={account.name}
                            name={account.name}
                            bank={account.bank}
                            number={account.number}
                            holder={account.holder}
                        />
                    ))}
                </div>
            </div>

            {/* 참석의사 전달하기 버튼 */}
            <div className="rsvp-button-section fade-in">
                <Button 
                    onClick={onOpenRSVP} 
                    size="large"
                    icon={<PiFlower size={20} />}
                >
                    참석의사 전달하기
                </Button>
            </div>
        </section>
    );
};