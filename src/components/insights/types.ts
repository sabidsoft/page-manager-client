export type MetricNames =
    | "page_impressions"
    | "page_impressions_unique"
    | "page_post_engagements"
    | "page_views_total"
    | "page_video_views"
    | "page_fan_adds"
    | "page_fan_removes";

export type MetricDisplayNames = {
    [key in MetricNames]: string;
};