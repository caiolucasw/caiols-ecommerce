import {
  Box,
  Button,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  IconButton,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PaymentPage from "../stripe/PaymentPage";

const steps = [
  {
    id: 0,
    label: "Endereço de Entrega",
    value: "address",
  },
  {
    id: 1,
    label: "Itens",
    value: "itens",
  },
  {
    id: 2,
    label: "Forma de pagamento",
    value: "payment",
  },
  {
    id: 3,
    label: "Concluído",
    value: "done",
  },
];

const total = 1500;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const activeValue = steps[steps.findIndex((step) => step.id === activeStep)];
  const [completed, setCompleted] = useState<{
    [k: number]: boolean;
  }>({});
  const [loading, setLoading] = useState(false);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        p: 2,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        my={2}
        mb={6}
        sx={{
          cursor: "pointer",
        }}
        onClick={() => navigate("/")}
      >
        <Typography fontWeight={600} variant="h4">
          Caio.
          <Typography
            variant="inherit"
            sx={{
              display: "inline-block",
              color: "var(--primary-color)",
            }}
          >
            ls
          </Typography>
        </Typography>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        gap={4}
      >
        <Stepper
          nonLinear
          activeStep={activeStep}
          alternativeLabel
          sx={{
            "& .MuiStepConnector-root": {
              flex: "1 1 auto",
              WebkitFlex: "1 1 auto",
            },
          }}
        >
          {steps.map((step) => (
            <Step key={step.id} completed={completed[step.id]}>
              <StepButton color="inherit">{step.label}</StepButton>
            </Step>
          ))}
        </Stepper>
        <Box display="flex">
          <Box mt={3} display="flex" flexDirection="column" flex={1}>
            {steps.map((step) => (
              <Box
                sx={{
                  p: 2,
                  border: "1px solid #ccc",
                  ...(activeValue && activeValue.id >= step.id
                    ? {
                        cursor: "pointer",
                      }
                    : {
                        cursor: "not-allowed",
                        opacity: 0.5,
                      }),
                  position: "relative",
                }}
                onClick={() => {
                  if (activeValue && activeValue.id > step.id) {
                    handleBack();
                  }
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 5,
                    top: 0,
                    transform: "translateY(20%)",
                  }}
                >
                  {activeValue && activeValue.id === step.id ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
                <Typography variant="subtitle1" fontWeight={700} mb={3}>
                  {step.label}
                </Typography>
                <Collapse
                  in={activeValue && activeValue.id === step.id}
                  timeout="auto"
                  unmountOnExit
                >
                  {activeValue.value === "address" && <Box>Testando</Box>}
                  {activeValue.value === "payment" && <PaymentPage />}
                </Collapse>
              </Box>
            ))}
          </Box>
          <Box>
            <Box
              sx={{
                p: 2,
                minWidth: { md: 240, lg: 350 },
                borderRadius: 2,
              }}
            >
              <Box
                sx={{
                  border: "1px solid #ccc",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                {activeStep !== steps.length - 1 && (
                  <>
                    <Box mb={2}>
                      <Button
                        variant="contained"
                        onClick={() => handleNext()}
                        fullWidth
                      >
                        {activeStep === steps.length - 2
                          ? "Finalizar"
                          : "Próximo"}
                      </Button>
                    </Box>
                    <Divider sx={{ my: 2 }} />
                  </>
                )}
                <Typography variant="subtitle1" fontWeight={700}>
                  Resumo da Compra
                </Typography>
                <Divider sx={{ mt: 1, mb: 2 }} />
                {loading ? (
                  <Box
                    p={2}
                    flex={1}
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    gap={2}
                  >
                    <CircularProgress size={50} />
                  </Box>
                ) : (
                  <Box display="flex" gap={3} flexDirection="column">
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography variant="h6" fontWeight={500}>
                        Total:
                      </Typography>
                      <Typography variant="subtitle1" fontWeight={700}>
                        {"R$ "}
                        {total.toLocaleString("pt-BR", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        })}
                      </Typography>
                    </Box>
                    {/* <Button
                      variant="contained"
                      onClick={() => navigate("/checkout")}
                    >
                      Comprar
                    </Button> */}
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default CheckoutPage;
