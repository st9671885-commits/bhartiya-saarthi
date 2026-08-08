import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  GraduationCap,
  BriefcaseBusiness,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

import {
  getProfile,
  updateProfile,
  getEligibility,
} from "../api/profileApi";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);

  const [age, setAge] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [phone, setPhone] = useState("");

  const [eligibility, setEligibility] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ==========================================
  // LOAD PROFILE
  // ==========================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getProfile();

      const citizen = data.citizen;

      setProfile(citizen);

      setAge(citizen.age ?? "");
      setOccupation(citizen.occupation ?? "");
      setIsStudent(citizen.is_student ?? false);
      setPhone(citizen.phone ?? "");

    } catch (err) {
      console.error("Profile loading error:", err);

      setError(
        "Unable to load your profile."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SAVE PROFILE
  // ==========================================

  const handleSave = async (event) => {
    event.preventDefault();

    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const data = await updateProfile({
        age: age === "" ? null : Number(age),

        occupation:
          occupation.trim() === ""
            ? null
            : occupation.trim(),

        is_student: isStudent,

        phone:
          phone.trim() === ""
            ? null
            : phone.trim(),
      });

      setProfile(data.citizen);

      setSuccess(
        "Profile updated successfully!"
      );

      // ======================================
      // LOAD UPDATED ELIGIBILITY
      // ======================================

      try {
        const eligibilityData =
          await getEligibility();

        setEligibility(
          eligibilityData.results || []
        );
      } catch (eligibilityError) {
        console.error(
          "Eligibility loading error:",
          eligibilityError
        );
      }

    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="profile-loading">

        <Loader2
          size={35}
          className="profile-spinner"
        />

        <h2>
          Loading your profile...
        </h2>

      </div>
    );
  }

  // ==========================================
  // PROFILE COMPLETION
  // ==========================================

  const completion =
    profile?.profile_completion ?? 0;

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="profile-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <header className="profile-header">

        <button
          className="profile-back"
          onClick={() =>
            navigate("/dashboard")
          }
        >
          <ArrowLeft size={18} />

          Back to Dashboard
        </button>

        <div className="profile-brand">
          <div className="brand-logo">
            BS
          </div>

          <div>
            <strong>
              Bhartiya Saarthi
            </strong>

            <span>
              Citizen Portal
            </span>
          </div>
        </div>

      </header>


      {/* ======================================
          MAIN
      ====================================== */}

      <main className="profile-main">

        <div className="profile-title">

          <span>
            CITIZEN PROFILE
          </span>

          <h1>
            Complete your profile
          </h1>

          <p>
            Help Saarthi find government services
            and schemes that may be relevant to you.
          </p>

        </div>


        {/* ====================================
            COMPLETION
        ==================================== */}

        <div className="profile-completion">

          <div className="completion-top">

            <div>

              <span>
                PROFILE COMPLETION
              </span>

              <strong>
                {completion}%
              </strong>

            </div>

          </div>

          <div className="completion-bar">

            <div
              className="completion-progress"
              style={{
                width: `${completion}%`,
              }}
            />

          </div>

          <small>
            Complete your profile to receive
            more accurate eligibility results.
          </small>

        </div>


        {/* ====================================
            MESSAGES
        ==================================== */}

        {error && (
          <div className="profile-message error">

            <AlertCircle size={18} />

            <span>
              {error}
            </span>

          </div>
        )}

        {success && (
          <div className="profile-message success">

            <CheckCircle2 size={18} />

            <span>
              {success}
            </span>

          </div>
        )}


        {/* ====================================
            PROFILE FORM
        ==================================== */}

        <form
          className="profile-form"
          onSubmit={handleSave}
        >

          <div className="profile-section">

            <div className="section-heading">

              <User size={20} />

              <div>

                <h2>
                  Personal Information
                </h2>

                <p>
                  Your basic citizen information.
                </p>

              </div>

            </div>


            {/* NAME */}

            <div className="profile-field">

              <label>
                Full Name
              </label>

              <div className="profile-input disabled">

                <User size={17} />

                <input
                  value={profile?.name || ""}
                  disabled
                />

              </div>

            </div>


            {/* EMAIL */}

            <div className="profile-field">

              <label>
                Email Address
              </label>

              <div className="profile-input disabled">

                <Mail size={17} />

                <input
                  value={profile?.email || ""}
                  disabled
                />

              </div>

            </div>


            {/* PHONE */}

            <div className="profile-field">

              <label>
                Phone Number
              </label>

              <div className="profile-input">

                <Phone size={17} />

                <input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                />

              </div>

            </div>


            {/* AGE */}

            <div className="profile-field">

              <label>
                Age
              </label>

              <div className="profile-input">

                <User size={17} />

                <input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Enter your age"
                  value={age}
                  onChange={(e) =>
                    setAge(e.target.value)
                  }
                />

              </div>

            </div>


            {/* OCCUPATION */}

            <div className="profile-field">

              <label>
                Occupation
              </label>

              <div className="profile-input">

                <BriefcaseBusiness
                  size={17}
                />

                <input
                  type="text"
                  placeholder="e.g. Student, Farmer, Teacher"
                  value={occupation}
                  onChange={(e) =>
                    setOccupation(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>


            {/* STUDENT */}

            <div className="student-option">

              <div className="student-icon">

                <GraduationCap size={21} />

              </div>

              <div className="student-text">

                <strong>
                  Are you currently a student?
                </strong>

                <span>
                  This helps us identify education
                  assistance schemes.
                </span>

              </div>

              <label className="switch">

                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={(e) =>
                    setIsStudent(
                      e.target.checked
                    )
                  }
                />

                <span className="slider"></span>

              </label>

            </div>


            {/* SAVE */}

            <button
              type="submit"
              className="profile-save"
              disabled={saving}
            >

              {saving ? (
                <>
                  <Loader2
                    size={18}
                    className="profile-spinner"
                  />

                  Saving...
                </>
              ) : (
                <>
                  <Save size={18} />

                  Save Profile
                </>
              )}

            </button>

          </div>

        </form>


        {/* ====================================
            ELIGIBILITY RESULTS
        ==================================== */}

        {eligibility.length > 0 && (

          <section className="eligibility-section">

            <div className="section-heading">

              <CheckCircle2 size={20} />

              <div>

                <h2>
                  Your Eligibility
                </h2>

                <p>
                  Services ranked according to
                  your profile.
                </p>

              </div>

            </div>


            <div className="eligibility-grid">

              {eligibility.map((item) => (

                <div
                  className="eligibility-card"
                  key={item.id}
                >

                  <div className="eligibility-top">

                    <span>
                      {item.category}
                    </span>

                    <strong>
                      {item.score}%
                    </strong>

                  </div>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div
                    className={
                      item.eligible
                        ? "eligibility-status eligible"
                        : "eligibility-status"
                    }
                  >

                    {item.eligible
                      ? "✓ Eligible"
                      : item.status ===
                        "information_required"
                      ? "⚠ More information required"
                      : "Not currently eligible"}

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default Profile;