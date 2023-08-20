import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// API
import { cancelSubscription } from "../api/employee";

// Components
import ProfilePic from "../components/ProfilePic";
import Button from "../components/Button";
import Icon from "../components/Icon";

// Utils
import { formatDateTime } from "../utils/dateTime";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const { setSidebarOpen, setModalOpen, setProModal } = useOutletContext();
  const navigate = useNavigate();

  const openProModal = () => {
    setSidebarOpen(false);
    setModalOpen(true);
    setProModal(true);
  };

  const handleUnsubscription = async () => {
    try {
      const id = user?.id;
      const data = await cancelSubscription(id);

      if (!data.ok) {
        throw new Error(data.message);
      }

      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Suscripción cancelada correctamente.");
      navigate("/profile");
    } catch (error) {
      if (error.message) {
        console.error(error.message);
        toast.error(error.message);
      } else {
        console.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
        toast.error("Algo ha ido mal. Vuelva a intentarlo más tarde.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen gap-12 px-4 py-12 lg:p-24 mt-14">
      <h3>Perfil</h3>
      <div className="flex flex-col justify-between gap-24 md:items-center md:flex-row">
        <div className="flex items-center gap-8">
          <ProfilePic
            src={user?.profile_pic_url}
            className="w-32 h-32 cursor-pointer"
          />
          <h4>{`${user?.first_name} ${user?.last_name}`}</h4>
        </div>
        <div className="flex flex-col gap-12 lg:gap-24 md:flex-row">
          <div>
            <span className="label">Correo electrónico</span>
            <p className="text-lg font-semibold">{user?.email}</p>
          </div>
          <div>
            <span className="label">Género</span>
            <p className="text-lg font-semibold">{user?.gender_name}</p>
          </div>
          <div>
            <span className="label">Suscripción</span>
            <p className="text-lg font-semibold">
              {user?.is_pro ? "Pro" : "Basic"}
            </p>
          </div>
        </div>
      </div>
      <div className="card">
        <h5>Suscripciones activas</h5>
        <div className="flex flex-col flex-wrap gap-12 md:items-center lg:gap-24 md:flex-row">
          <div
            className={`flex items-center justify-center w-24 h-24 border-2  rounded-full ${
              user?.is_pro
                ? "border-green-500 bg-green-500/5"
                : "border-blue-500 bg-blue-500/5"
            }`}
          >
            <p
              className={`text-xl font-bold uppercase ${
                user?.is_pro ? "text-green-500" : "text-blue-500"
              }`}
            >
              {user?.is_pro ? "Pro" : "Basic"}
            </p>
          </div>
          <div>
            <span className="label">Nombre</span>
            <p className="text-lg font-semibold">
              LevelUp {user?.is_pro ? "Pro" : "Basic"}
            </p>
          </div>
          <div>
            <span className="label">Precio</span>
            <p className="text-lg font-semibold">
              {user?.is_pro ? "HNL 499.99" : "HNL 0.00"}
            </p>
          </div>
          <div>
            <span className="label">Duración</span>
            <p className="text-lg font-semibold">
              {user?.is_pro ? "1 Mes" : "De por vida"}
            </p>
          </div>
          {user?.is_pro ? (
            <>
              <div>
                <span className="label">Próxima fecha de facturación</span>
                <p className="text-lg font-semibold">
                  {formatDateTime(user?.subscription_end_date)}
                </p>
              </div>
              <div>
                <Button variant="primary" onClick={handleUnsubscription}>
                  Cancelar suscripción
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Button
                variant="primary"
                className="flex justify-center w-full gap-2"
                onClick={openProModal}
              >
                <Icon icon="pro" />
                Mejorar a Pro
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
