export type InstanceTag = {
  key: string;
  value: string;
};

export type Instance = {
  class: string;
  id: string;
  provider: 'aws' | 'azure' | 'gcp' | 'other';
  state: 'pending' | 'running' | 'stopped' | 'terminated';
  tags: InstanceTag[];
  type: 'database' | 'vm';
};

export type AwsCredentials = {
  accessKeyId: string;
  region: string;
  secretAccessKey: string;
};

export interface CloudProviderInstanceList {
  listInstances(credentials: AwsCredentials): Promise<Instance[]>;
}
