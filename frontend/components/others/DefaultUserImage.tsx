import Image from 'next/image';

type Props = {
  className?: string;
};
export const DefaultUserImage = ({ className }: Props) => {
  return (
    <Image
      src="/images/default_user_profile.jpeg"
      alt="road"
      layout="fill"
      objectFit="cover"
      className={className}
    />
  );
};
export default DefaultUserImage;
