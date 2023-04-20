interface HeadingSectionProps {
  businessName: string | undefined;
  businessAddress: string | undefined;
}

export const HeadingSection = ({
  businessName,
  businessAddress,
}: HeadingSectionProps) => {
  return (
    <>
      <h2>{businessName}</h2>
      <p>{businessAddress}</p>
    </>
  );
};

export default HeadingSection;
