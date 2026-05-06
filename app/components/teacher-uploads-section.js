"use client";

import Link from "next/link";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { teacherUploads } from "../data/teacher-uploads";

const UNSEEN_UPLOADS_KEY = "godomain-unseen-uploads";

function getInitialUnseenMap() {
  return teacherUploads.reduce((acc, upload) => {
    acc[upload.id] = true;
    return acc;
  }, {});
}

function persistUnseenMap(nextMap) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(UNSEEN_UPLOADS_KEY, JSON.stringify(nextMap));
}

function UploadCard({ upload, unseen, onMarkSeen }) {
  return (
    <article
      className={`teacher-card teacher-card-link ${upload.accent}${
        unseen ? " is-unseen" : " is-seen"
      }`}
    >
      <div className="teacher-card-top">
        <span className={`teacher-icon ${upload.icon}`} />
        <span className="teacher-type">{upload.type}</span>
        <button
          type="button"
          className={`teacher-new-button${unseen ? " unseen" : " seen"}`}
          aria-pressed={!unseen}
          onClick={() => onMarkSeen(upload.id)}
        >
          <span>{unseen ? "New" : "Seen"}</span>
          {unseen ? <span className="teacher-new-popup">+1</span> : null}
        </button>
      </div>

      <div className="teacher-card-copy">
        <div className="teacher-title">{upload.title}</div>
        <div className="teacher-meta">{upload.meta}</div>
        <p className="teacher-summary">{upload.summary}</p>
      </div>

      <div className="teacher-chip-row">
        <span className="teacher-chip">{upload.teacher}</span>
        <span className="teacher-chip">
          {upload.deliverables[0]?.value ?? "1"} items
        </span>
        <span className="teacher-chip">
          {upload.deliverables[1]?.value ?? "Revision"}
        </span>
      </div>

      <div className="teacher-card-footer">
        <span className="teacher-card-status">
          {unseen ? "Waiting for review" : "Marked as seen"}
        </span>
        <div className="teacher-card-actions">
          <Link className="teacher-primary-action" href={upload.href}>
            {upload.action}
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function TeacherUploadsSection() {
  const [unseenMap, setUnseenMap] = useState(() => getInitialUnseenMap());
  const [optimisticUnseenMap, setOptimisticUnseenMap] = useOptimistic(
    unseenMap,
    (currentState, nextState) => ({ ...currentState, ...nextState }),
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const stored = window.localStorage.getItem(UNSEEN_UPLOADS_KEY);
    if (!stored) {
      persistUnseenMap(getInitialUnseenMap());
      return;
    }

    try {
      const parsed = JSON.parse(stored);
      const nextState = {
        ...getInitialUnseenMap(),
        ...parsed,
      };
      setUnseenMap(nextState);
    } catch {
      persistUnseenMap(getInitialUnseenMap());
    }
  }, []);

  function handleMarkSeen(uploadId) {
    startTransition(() => {
      setOptimisticUnseenMap({ [uploadId]: false });
    });

    setUnseenMap((currentState) => {
      const nextState = {
        ...currentState,
        [uploadId]: false,
      };
      persistUnseenMap(nextState);
      return nextState;
    });
  }

  const dashboardUploads = [
    "video-upload",
    "image-upload",
    "resource-upload",
  ]
    .map((id) => teacherUploads.find((upload) => upload.id === id))
    .filter(Boolean);

  return (
    <section className="dash-section teacher-uploads-section">
      <div className="dash-section-head">
        <div>
          <div className="dash-section-title">Teacher uploads</div>
          <div className="dash-section-subtitle">
            Essential revision content grouped as videos, images, and notes.
          </div>
        </div>
        <div className="teacher-uploads-summary">
          <span className="teacher-summary-pill">
            {Object.values(optimisticUnseenMap).filter((value) => value).length}{" "}
            unseen
          </span>
        </div>
      </div>

      <div className="teacher-grid teacher-grid-three">
        {dashboardUploads.map((upload) => (
          <UploadCard
            key={upload.id}
            upload={{
              ...upload,
              type:
                upload.id === "resource-upload"
                  ? "Notes / links"
                  : upload.type,
            }}
            unseen={Boolean(optimisticUnseenMap[upload.id])}
            onMarkSeen={handleMarkSeen}
          />
        ))}
      </div>
    </section>
  );
}
