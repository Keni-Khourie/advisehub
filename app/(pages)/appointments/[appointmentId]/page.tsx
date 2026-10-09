import AppointmentContent from "./AppointmentContent";

interface Props {
  params: Promise<{
    appointmentId: string;
  }>;
}
const Appointment = async ({ params }: Props) => {
  const { appointmentId } = await params;

  return <AppointmentContent appointmentId={parseInt(appointmentId)} />;
};

export default Appointment;
